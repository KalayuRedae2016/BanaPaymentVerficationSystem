const organizationController=require('../Controllers/organiztionController')
const authoController = require('../Controllers/authoController');
const express = require('express');
const app = express();
const router=express()

// Protect all routes after this middleware
router.use(authoController.authenticationJwt);

router.route('/')
    .get(organizationController.getOrganization)
    .post(organizationController.createOrganization)
    .delete(organizationController.deleteOrgs)
    
router.route('/:id').patch(organizationController.updateOrganization)
router.route('/:id/bankAccounts').post(organizationController.addBankAccount)
module.exports=router