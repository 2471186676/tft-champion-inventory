var express = require('express');
var router = express.Router();

// require controller
let champion_controller = require('../controller/championController');
let ability_controller = require('../controller/abilityController');
let trait_controller = require('../controller/traitController');

// champion router

// // GET all champion
router.get('/page/champions', champion_controller.champion_viewer); 
router.get('/page/champions/:id', champion_controller.champion_viewer); 
// // POST to update champion
// router.post('/champion/:id/update', champion_controller.update_post); 
// router.get('/champion/:id/update', champion_controller.update_get); 
// // POST to add new champion
router.get('/page/champion/add', champion_controller.add_get);
router.post('/page/champion/add', champion_controller.add_post);   
// // POST to delete champion
// router.post('/champion/:id/delete', champion_controller.delete_post);
// router.get('/champion/:id/delete', champion_controller.delete_get);


// trait router

// // GET all trait detail
router.get('/page/trait', trait_controller.trait_list);
// //  update a trait
// router.post('/trait/:id/update', trait_controller.update_post);
// router.get('/trait/:id/update', trait_controller.update_get);
// //  add a new trait
router.get('/page/trait/add', trait_controller.add_trait);
// router.get('/trait/:id/add', trait_controller.add_get);
// //  delete a trait
// router.post('/trait/:id/delete', trait_controller.delete_post);
// router.get('/trait/:id/delete', trait_controller.delete_get);

// item router




module.exports = router;

