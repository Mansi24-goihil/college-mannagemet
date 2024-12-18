// controllers/roleController.js
const Role = require('../models/Role');

exports.createRole = async (req, res) => {
  const newRole = new Role(req.body);
  try {
    const existingRole = await Role.findOne({ name: new RegExp(`^${req.body.name}$`, 'i') });
    if (existingRole) {
      return res.status(400).json({ message: 'Role is already exists' });
    }
    const role = await newRole.save();
    res.status(200).json(role);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({})
      .populate({
        path: 'menus.pages.permissions',
        model: 'Permission',
        options: { strictPopulate: false }
      })
      .populate({
        path: 'menus.pages.submenus.permissions',
        model: 'Permission',
        options: { strictPopulate: false }
      });
    res.status(200).json(roles);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(200).send('Role deleted successfully');
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.removeMenuFromRole = async (req, res) => {
  const { roleId, menuId } = req.params;

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found.' });
    }

    role.menus = role.menus.filter(menu => menu._id.toString() !== menuId);
    await role.save();

    res.json({ message: 'Menu removed successfully', role });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};



exports.getMenusByRole = async (req, res) => {
  const { roleId } = req.params;
  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.json({ menus: role.menus });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// exports.updateMenuStatus = async (req, res) => {
//   const { roleId } = req.params;
//   const { menuName, submenuName, status } = req.body;

//   try {
//     const role = await Role.findById(roleId);
//     if (!role) {
//       return res.status(404).json({ message: 'Role not found' });
//     }

//     const menu = role.menus.find(menu => menu.name === menuName);
//     if (menu) {
//       const submenu = menu.pages.find(page => page.name === submenuName);
//       // if (submenu) {
//       //   submenu.permissions = status ? [...submenu.permissions, 'ALLOW'] : submenu.permissions.filter(permission => permission !== 'ALLOW');
//       //   menu.status = menu.pages.some(page => page.status === true);
//       // }
//       if (submenu) {
//         submenu.permissions = status ? [...submenu.permissions, 'ALLOW'] : submenu.permissions.filter(permission => permission !== 'ALLOW');

//         // Update menu status based on pages and submenus
//         menu.status = menu.pages.some(page => page.status === true || 
//           (Array.isArray(page.submenus) && page.submenus.some(submenu => submenu.status === true))
//         );}
//     }


//     await role.save();
//     res.status(200).json({ message: 'Menu status updated successfully', role });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error', error });
//   }
// };





//needed 

exports.addMenuToRole = async (req, res) => {
  const { roleId } = req.params;
  const { name, pages } = req.body.menus;

  if (!name || !Array.isArray(pages)) {
    return res.status(400).json({ message: 'Invalid data: Name and pages are required.' });
  }
  const menu = { name, pages };

  // const menu = { name, pages,submenus };

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found.' });
    }

    const menuExists = role.menus.some(existingMenu => existingMenu.name === name);
    if (menuExists) {
      return res.status(400).json({ message: 'Menu with this name already exists for this role.' });
    }

    menu.pages.forEach((page) => {
      if (!page.name) {
        throw new Error('page must have a name');
      }

      if (typeof page.status !== 'boolean') {
        page.status = false;
      }

      if (page.submenus && Array.isArray(page.submenus)) {
        page.submenus.forEach(submenu => {
          if (!submenu.name) {
            throw new Error('submenu Must have name');
          }

          if (!Array.isArray(submenu.permissions)) {
            submenu.permissions = [];
          }

          if (typeof submenu.status !== 'boolean') {
            submenu.status = false;
          }
        })
      }
    })
    role.menus.push(menu);
    await role.save();

    res.status(200).json({ message: 'Menu added successfully.', role });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

exports.addSubmenuToRole = async (req, res) => {
  const { roleId, menuName } = req.params;
  const { submenu } = req.body;

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Invalid role.' });
    }

    const menu = role.menus.find(menu => menu.name === menuName);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found.' });
    }

    if (!menu.pages) {
      menu.pages = [];
    }

    const page = menu.pages.find(page => page.name === submenu.pageName);
    if (page) {
      page.submenus = page.submenus || [];
      page.submenus.push(submenu);
    }
    else {
      menu.pages.push({
        name: submenu.pageName,
        submenus: [submenu],
      })
    }
    // menu.pages.push(submenu);
    await role.save();

    res.status(200).json({ message: 'Submenu added successfully', role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.addNestedSubmenuToRole = async (req, res) => {
  const { roleId, menuName, submenuName } = req.params;
  const { nestedSubmenu } = req.body;

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Invalid role.' });
    }

    const menu = role.menus.find(menu => menu.name === menuName);
    if (!menu) {
      return res.status(404).json({ message: 'Invalid menu.' });
    }

    const submenu = menu.pages.find(page => page.name === submenuName);
    if (!submenu) {
      return res.status(404).json({ message: 'Submenu not found.' });
    }

    submenu.submenus.push(nestedSubmenu);
    await role.save();

    res.status(200).json({ message: 'Nested submenu added successfully', role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateMenuStatus = async (req, res) => {
  const { roleId } = req.params;
  const { updatedMenu } = req.body;  // Ensure you're using the correct data format

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    const menu = role.menus.find(menu => menu.name === updatedMenu.name);
    if (menu) {
      updatedMenu.pages.forEach((updatedPage) => {
        const existingPage = menu.pages.find(page => page.name === updatedPage.name);
        if (existingPage) {
          existingPage.status = updatedPage.status;
          existingPage.permissions = updatedPage.permissions;

          // Update the submenus
          updatedPage.submenus.forEach(updatedSubmenu => {
            const existingSubmenu = existingPage.submenus.find(submenu => submenu.name === updatedSubmenu.name);
            if (existingSubmenu) {
              existingSubmenu.status = updatedSubmenu.status;
              existingSubmenu.permissions = updatedSubmenu.permissions;
            } else {
              // Add the new submenu if it doesn't exist
              existingPage.submenus.push(updatedSubmenu);
            }
          });
        }
      });

      // Recalculate the menu status based on pages and submenus
      // menu.status = menu.pages.some(page => page.status === true || 
      //   (Array.isArray(page.submenus) && page.submenus.some(submenu => submenu.status === true))
      // );

      menu.status = menu.pages.some(page => page.status || page.submenus.some(sub => sub.status));
    }

    await role.save();
    res.status(200).json({ message: 'Menu status updated successfully', role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

//for chanage the stutus and permissions of the menus ,pages and submenus

exports.updateSubmenuStatus = async (req, res) => {
  const { roleId } = req.params;
  const { updates } = req.body;

  try {
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }

    updates.forEach((update) => {
      const menu = role.menus.find(menu =>
        menu.pages.some(page => page.name === update.name)
      );

      if (menu) {
        const page = menu.pages.find(page => page.name === update.name);
        if (page) {
          page.status = update.status;
          page.permissions = update.permissions;

          page.submenus = page.submenus || [];

          if (!Array.isArray(page.submenus)) {
            page.submenus = [];  // Initialize submenus if not already an array
          }

          // Update existing submenus or add new ones
          update.submenus?.forEach((updateSubmenu) => {
            const existingSubmenu = page.submenus.find(submenu => submenu.name === updateSubmenu.name);
            if (existingSubmenu) {
              // If submenu exists, update it
              existingSubmenu.status = updateSubmenu.status;
              existingSubmenu.permissions = updateSubmenu.permissions;
            } else {
              // If submenu doesn't exist, add it
              page.submenus.push({
                name: updateSubmenu.name,
                status: updateSubmenu.status || false,
                permissions: updateSubmenu.permissions || [],
              });
            }
          });


          menu.status = menu.pages.some(page => page.status === true ||
            (Array.isArray(page.submenus) && page.submenus.some(submenu => submenu.status))
          );

          // menu.pages.some(page => Array.isArray(page.submenus) && page.submenus.some(submenu => submenu.status === true));
        }
      }
    });

    await role.save();
    res.status(200).json({ message: 'Submenu statuses and permissions updated successfully' });
  } catch (error) {
    console.error('Error updating submenu status and permissions:', error);
    res.status(500).json({ message: 'Failed to update submenu status and permissions' });
  }

};

