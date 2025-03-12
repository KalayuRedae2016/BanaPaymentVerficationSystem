const organizationController=require('../Controllers/organiztionController')
const authoController = require('../Controllers/authoController');
const {authenticateApiKey,protectWithPassword}=require('../Middlware/verifyApiKey')
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



router.route('/apikey/:keyId').patch(protectWithPassword,organizationController.updateAPiKey)
router.route('/apiKey')
    .get(protectWithPassword,organizationController.viewAPiKey)


module.exports=router