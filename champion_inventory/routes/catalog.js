var express = require('express');
var router = express.Router();

// require controller
let champion_controller = require('../controller/championController');
let ability_controller = require('../controller/abilityController');
let trait_controller = require('../controller/traitController');

// champion router

// // GET all champion
router.get('/page/champion', champion_controller.champion_list); 
// // POST to update champion
// router.post('/champion/:id/update', champion_controller.update_post); 
// router.get('/champion/:id/update', champion_controller.update_get); 
// // POST to add new champion
// router.post('/champion/add', champion_controller.add_post);
// router.get('/champion/add', champion_controller.add_get);   
// // POST to delete champion
// router.post('/champion/:id/delete', champion_controller.delete_post);
// router.get('/champion/:id/delete', champion_controller.delete_get);

// // ability router

// // GET detail of a ability
// router.get('/ability/:id', ability_controller.get_detail);
// // add an new ability
// router.post('/ability/:id/add', ability_controller.add_post);
// router.get('/ability/:id/add', ability_controller.add_get);
// // update an ability
// router.post('/ability/:id/update', ability_controller.update_posy);
// router.get('/ability/:id/update', ability_controller.update_get);
// // remove an ability
// router.post('/ability/:id/remove', ability_controller.remove_post);
// router.get('/ability/:id/remove', ability_controller.remove_get);

// // trait router

// // GET all trait detail
// router.get('/trait', trait_controller.get_all);
// // GET a trait detail
// router.get('/trait/:id', trait_controller.get_one);
// //  update a trait
// router.post('/trait/:id/update', trait_controller.update_post);
// router.get('/trait/:id/update', trait_controller.update_get);
// //  add a new trait
// router.post('/trait/:id/add', trait_controller.add_post);
// router.get('/trait/:id/add', trait_controller.add_get);
// //  delete a trait
// router.post('/trait/:id/delete', trait_controller.delete_post);
// router.get('/trait/:id/delete', trait_controller.delete_get);




module.exports = router;

