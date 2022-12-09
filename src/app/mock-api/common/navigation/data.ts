/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'administrator',
        title: 'Administrator',
        subtitle: 'List of main menu for admin role',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                title: 'รายชื่อสมาชิก',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/member/list',
            },
           
            {
                title: 'รายการเติมเงิน',
                type: 'basic',
                icon: 'heroicons_outline:cash',
                link: 'transaction/list'
            },
        ],
    },

    {
        id: 'account',
        title: 'Account',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [

            {
                id: 'signout',
                title: 'ออกจากระบบ',
                type: 'basic',
                icon: 'heroicons_outline:logout',
                link: '/sign-out',
            },
        ],
    },
];
