
const ctrl = {};

ctrl.getId = (req, res) => {
    const id = req.params.id;
    res.json({
        message: "this is a sample message",
        id
    });
};

export default ctrl;
