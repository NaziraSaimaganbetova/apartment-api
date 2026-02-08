const Apartment = require('../models/apartment');
const Joi = require('joi'); // Импортируем Joi для валидации

exports.createApartment = async (req, res) => {
    // 1. Валидация входных данных (Пункт 5 требований)
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        price: Joi.number().positive().required(),
        listingType: Joi.string().valid('rent', 'sell').required(),
        description: Joi.string().optional(),
        location: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    try {
        // Привязываем квартиру к ID юзера из токена
        const newApartment = new Apartment({ 
            ...req.body, 
            owner: req.user.id // Убедись, что в модели поле называется owner
        });
        const apartment = await newApartment.save();
        res.status(201).json(apartment);
    } catch (err) {
        res.status(400).json({ msg: 'Ошибка при создании' });
    }
};

exports.getApartments = async (req, res) => {
    try {
        // Находим только те квартиры, которые принадлежат этому юзеру
        const apartments = await Apartment.find({ owner: req.user.id });
        res.json(apartments);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.deleteApartment = async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);

        if (!apartment) return res.status(404).json({ msg: 'Квартира не найдена' });

        // ПРОВЕРКА: является ли юзер владельцем этой квартиры?
        if (apartment.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Нет прав на удаление чужого объявления' });
        }

        await apartment.deleteOne();
        res.json({ msg: 'Apartment removed' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Аналогичную проверку владельца (if apartment.owner !== req.user.id) 
// стоит добавить и в updateApartment!
exports.getApartmentById = async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);
        if (!apartment) return res.status(404).json({ msg: 'Квартира не найдена' });
        res.json(apartment);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.updateApartment = async (req, res) => {
    try {
        let apartment = await Apartment.findById(req.params.id);
        if (!apartment) return res.status(404).json({ msg: 'Квартира не найдена' });

        if (apartment.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Нет прав на редактирование' });
        }

        apartment = await Apartment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(apartment);
    } catch (err) {
        res.status(500).send('Server error');
    }
};