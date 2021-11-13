const express = require('express');
const router = express.Router();
const pool = require('../database.js');

router.get('/', async (req, res) => {
    let listOffice = await pool.query('SELECT * FROM office');
    res.json({
        status: 200,
        message: "Estas son todas las oficinas :D",
        listOffice: listOffice
    });
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    let office = await pool.query('SELECT * FROM office WHERE id = ?',[id]);
    res.json({
        status: 200,
        message: "Esta es la oficina que seleccionaste :D",
        office: office
    })
});

router.post('/create', async (req, res) => {
    const {office_code, address} = req.body;
    const office = {
        office_code, address
    };
    await pool.query('INSERT INTO office set ?', [office]);
    res.json({
        status: 200,
        message: "Oficina registrada con exito :D",
        office: office
    });
});

router.post('/update:id', async (req, res) => {
    const {id} = req.params;
    const {office_code, address} = req.body;

    const office = {office_code, address};

    await pool.query('UPDATE office SET ? WHERE id = ?', [office, id]);
    res.json({
        status: 200,
        message: "La oficina ha sido actualizada :D",
        office: office
    });
});

router.post('/delete:id', async (req, res) => {
    const {id} = req.params;

    await pool.query('DELETE FROM office WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Oficina eliminada :O"
    });
});



module.exports = router;