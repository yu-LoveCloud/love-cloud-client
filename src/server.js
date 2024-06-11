const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());

// MySQL 데이터베이스 연결 설정
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root', // MySQL 사용자 이름
    password: 'Slsxpseh1!', // MySQL 비밀번호
    database: 'love_cloud' // 사용할 데이터베이스 이름
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Love Cloud');
});

// 모든 요청에 대해 CORS를 허용
const cors = require('cors');
app.use(cors());

// 회원가입 API
app.post('/api/signup', async (req, res) => {
    const { email, name, phoneNumber, password, weddingRole } = req.body;

    // 입력 데이터 유효성 검사
    if (!email || !name || !phoneNumber || !password) {
        return res.status(400).send('All fields are required');
    }

    // 이메일 중복 체크
    const checkEmailSql = 'SELECT email FROM client WHERE email = ?';
    db.query(checkEmailSql, [email], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).send('Error checking email');
        }
        if (results.length > 0) {
            return res.status(409).send('Email already exists');
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const sql = `INSERT INTO client (email, name, phoneNumber, password, weddingRole) VALUES (?, ?, ?, ?, ?)`;
            db.query(sql, [email, name, phoneNumber, hashedPassword, weddingRole], (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Failed to add user');
                } else {
                    res.send('User added successfully');
                }
            });
        } catch (err) {
            console.error('Error while hashing the password:', err);
            res.status(500).send('Error processing your request');
        }
    });
});


// 로그인 API
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM client WHERE email = ?';

    db.query(sql, [email], async (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length > 0) {
            const comparison = await bcrypt.compare(password, results[0].password);
            if (comparison) {
                return res.json({ message: 'Login successful', user: results[0] });
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            return res.status(404).json({ message: 'Client not found' });
        }
    });
});

// 사용자 정보 가져오기(MyPage.js)
app.get('/users', (req, res) => {
    // 모든 사용자의 모든 정보를 조회하는 대신 필요한 정보만 선택하여 조회
    const sql = 'SELECT email, name, phoneNumber, weddingRole FROM client';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).send('Failed to retrieve users');
            return;
        }
        res.json(results);
    });
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
