const express = require('express');
const router = express.Router();

const {
  createInvitation,
  getAllInvitations,
  getInvitationById,
  updateInvitation,
  deleteInvitation,
} = require('../controllers/invitationController');

router.post('/', createInvitation);
router.get('/', getAllInvitations);
router.get('/:id', getInvitationById);
router.put('/:id', updateInvitation);
router.delete('/:id', deleteInvitation);
module.exports = router;
