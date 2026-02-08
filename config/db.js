const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Мы используем переменную mongoose, которую импортировали выше
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected successfully...');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        // Завершаем процесс с ошибкой, если база не подключилась
        process.exit(1);
    }
};

module.exports = connectDB;