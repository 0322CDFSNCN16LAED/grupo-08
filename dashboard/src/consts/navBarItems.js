import React from 'react';

//import ICONS
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CategoryIcon from '@mui/icons-material/Category';

export const navBarItems = [
    {
        id:0,
        icon: <HomeIcon/>,
        label: 'Home',
        link: '/'
    },{
        id: 1,
        icon: <GroupIcon/>,
        label: 'Listado Users',
        link: '/users'
    },{
        id:2,
        icon: <CardGiftcardIcon/>,
        label: 'Listado de Productos',
        link: '/products',
    },{
        id: 3,
        icon: <CategoryIcon/>,
        label: 'Categorías',
        link: '/categories'
    }
]