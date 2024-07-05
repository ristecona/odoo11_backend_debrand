# -*- coding: utf-8 -*-

# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

# Odoo



# description:
{
    'name': 'Odoo 11 Backend Debranding, Quick Debug,Clear Data)',
    'version': '11.0.4.30',
    'author': 'Unknown',
    'category': 'Productivity',
    'license': 'AGPL-3',
    'price' : 59.99,
    'currency' : 'EUR',
    'sequence': 2,
    'summary': 'Odoo 11 Backend Debranding, Quick Debug,Clear Data,Delete test data.',
    'description': """

App Odoo Customize(Debranding Title,Language,Documentation,Quick Debug)
============
White label odoo.
Support Odoo 11
You can use:
1. Deletes Odoo label in footer
2. Replaces "Odoo" in Windows title
3. Customize Documentation, Support, About links and title in usermenu
4. Adds "Developer mode" link to the top right-hand User Menu.
5. Adds Quick Language Switcher to the top right-hand User Menu.
6. Adds Country flags  to the top right-hand User Menu.
7. Adds English and Chinese user documentation access to the top right-hand User Menu.
8. Adds developer documentation access to the top right-hand User Menu.
9. Customize "My odoo.com account" button
10. Standalone setting panel, easy to setup.
11. Provide 236 country flags.
12. Multi-language Support.
13. Change Powered by Odoo in login screen.(Please change '../views/odoo11_backend_debrand_view.xml' #15)
14. Quick delete test data in Apps: Sales/POS/Purchase/MRP/Inventory/Accounting/Message/Workflow etc.
15. Reset All the Sequence to beginning of 1: SO/PO/MO/Invoice...
16. Fix odoo reload module translation bug while enable english language
17. Stop Odoo Auto Subscribe(Performance Improve)
18. Show/Hide Author and Website in Apps Dashboard

This module can help to white label the Odoo.
Also helpful for training and support for your odoo end-user.
The user can get the help document just by one click.

    """,
    'images': ['static/description/banner.png'],
    'depends': ['base', 'web', 'mail'],
    'data': [
        'views/app_odoo_customize_view.xml',
        'views/app_theme_config_settings_view.xml',
        'views/ir_model_view.xml',
        # data
        'data/ir_config_parameter.xml',
        'data/res_company_data.xml',
        'data/res_groups.xml',
        'security/ir.model.access.csv',
    ],
    'demo': [],
    'test': [
    ],
    'installable': True,
    'application': True,
    'auto_install': False,
    'qweb': [
        'static/src/xml/customize_user_menu.xml',
    ],
}
