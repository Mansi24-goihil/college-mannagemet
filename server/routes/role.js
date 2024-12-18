// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const roleController = require('../Controller/role');

// Routes for Role CRUD operations
router.post('/create', roleController.createRole);
router.get('/read', roleController.getRoles);
router.put('/update/:id', roleController.updateRole);
router.delete('/delete/:id', roleController.deleteRole);
router.put('/add-menu/:roleId', roleController.addMenuToRole);
router.delete('/remove-menu/:roleId/:menuId', roleController.removeMenuFromRole);
router.put('/add-submenu/:roleId/:menuName', roleController.addSubmenuToRole);
router.put('/add-nested-submenu/:roleId/:menuName/:submenuName', roleController.addNestedSubmenuToRole);
router.get('/:roleId/menus', roleController.getMenusByRole);
router.put('/update-menu/:roleId', roleController.updateMenuStatus);
router.put('/update-submenu-status/:roleId', roleController.updateSubmenuStatus);

module.exports = router;
