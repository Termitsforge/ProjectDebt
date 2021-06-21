export default function(req, res, next){
    res.locals.nameAuth = req.session.nameAuth;
    res.locals.ID = req.session.ID;
    next();
}