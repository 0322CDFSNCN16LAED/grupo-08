const {user} = require('../../database/models');

/* ○ Deberá devolver un objeto literal con la siguiente estructura:
■ count → cantidad total de usuarios en la base.
■ users → array con la colección de usuarios, cada uno con:
    ● id
    ● name
    ● email
    ● detail → URL para obtener el detalle. */

const usersApiController = {
    list: (req, res) => {
        res.send('holu')
    },
}

module.exports = usersApiController;