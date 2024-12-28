const organizationController=require('../Controllers/organiztionController')
const express = require('express');
const app = express();
const router=express()

router.route('/')
    .get(organizationController.getOrganization)
    .post(organizationController.createOrganization)
    .delete(organizationController.deleteOrgs)
    
router.route('/:id').patch(organizationController.updateOrganization)
router.route('/:id/bankAccounts').post(organizationController.addBankAccount)
module.exports=router