const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Добавь фигурные скобки {}
const { createApartment, getApartments, getApartmentById, updateApartment, deleteApartment } = require('../controllers/apartmentController');

router.post('/', protect, createApartment);
router.get('/', protect, getApartments);
router.get('/:id', protect, getApartmentById);
router.put('/:id', protect, updateApartment);
router.delete('/:id', protect, deleteApartment);

module.exports = router;