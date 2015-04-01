/**
 * Created by mcheng on 2/11/15.
 */
function extend(target) {
  var sources = [].slice.call(arguments, 1);
  sources.forEach(function (source) {
    for (var prop in source) {
      target[prop] = source[prop];
    }
  });
  return target;
}

var util = require('util'),
  actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil'),
   _ = require('lodash');


module.exports = {

  create: function(req, res, model, ext) {
    var Model = actionUtil.parseModel(req);

    // Create data object (monolithic combination of all parameters)
    // Omit the blacklisted params (like JSONP callback param, etc.)
    var data = actionUtil.parseValues(req);

    //** add user Id and extra values
    data = extend({},data,ext);
    data.userId = req.userData.userId;

    // Create new instance of model using data from params
    Model.create(data).exec(function created (err, newInstance) {

      // Differentiate between waterline-originated validation errors
      // and serious underlying issues. Respond with badRequest if a
      // validation error is encountered, w/ validation info.
      if (err) return res.negotiate(err);

      // If we have the pubsub hook, use the model class's publish method
      // to notify all subscribers about the created item
      if (req._sails.hooks.pubsub) {
        if (req.isSocket) {
          Model.subscribe(req, newInstance);
          Model.introduce(newInstance);
        }
        Model.publishCreate(newInstance, !req.options.mirror && req);
      }

      // Send JSONP-friendly response if it's supported
      // (HTTP 201: Created)
      res.status(201);
      res.ok(newInstance.toJSON());
    });
  },

  update: function(req, res, model, ext) {


    // Look up the model
    var Model = actionUtil.parseModel(req);

    // Locate and validate the required `id` parameter.
    var pk = actionUtil.requirePk(req);

    // Create `values` object (monolithic combination of all parameters)
    // But omit the blacklisted params (like JSONP callback param, etc.)
    var values = actionUtil.parseValues(req);

    // error is userId is not current login user
    if (values.userId && values.userId != req.userData.userId) {
      return res.customError('508', sails.config.errs.access_notTheUser);
    }

    console.log('before', values);

    //** add user Id and extra values
    values = extend({}, values, ext);
    values.userId = req.userData.userId;
    console.log('after', values);

    // Omit the path parameter `id` from values, unless it was explicitly defined
    // elsewhere (body/query):
    var idParamExplicitlyIncluded = ((req.body && req.body.id) || req.query.id);
    if (!idParamExplicitlyIncluded) delete values.id;


    // Find and update the targeted record.
    //
    // (Note: this could be achieved in a single query, but a separate `findOne`
    //  is used first to provide a better experience for front-end developers
    //  integrating with the blueprint API.)
    Model.findOne(pk).populateAll().exec(function found(err, matchingRecord) {

      if (err) return res.serverError(err);
      if (!matchingRecord) return res.notFound();

      Model.update(pk, values).exec(function updated(err, records) {

        // Differentiate between waterline-originated validation errors
        // and serious underlying issues. Respond with badRequest if a
        // validation error is encountered, w/ validation info.
        if (err) return res.negotiate(err);


        // Because this should only update a single record and update
        // returns an array, just use the first item.  If more than one
        // record was returned, something is amiss.
        if (!records || !records.length || records.length > 1) {
          req._sails.log.warn(
            util.format('Unexpected output from `%s.update`.', Model.globalId)
          );
        }

        var updatedRecord = records[0];

        // If we have the pubsub hook, use the Model's publish method
        // to notify all subscribers about the update.
        if (req._sails.hooks.pubsub) {
          if (req.isSocket) {
            Model.subscribe(req, records);
          }
          Model.publishUpdate(pk, _.cloneDeep(values), !req.options.mirror && req, {
            previous: matchingRecord.toJSON()
          });
        }

        // Do a final query to populate the associations of the record.
        //
        // (Note: again, this extra query could be eliminated, but it is
        //  included by default to provide a better interface for integrating
        //  front-end developers.)
        var Q = Model.findOne(updatedRecord[Model.primaryKey]);
        Q = actionUtil.populateEach(Q, req);
        Q.exec(function foundAgain(err, populatedRecord) {
          if (err) return res.serverError(err);
          if (!populatedRecord) return res.serverError('Could not find record after updating!');
          res.ok(populatedRecord);
        }); // </foundAgain>
      });// </updated>
    }); // </found>
  }
}
