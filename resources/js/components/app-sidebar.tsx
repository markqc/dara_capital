import { Link } from '@inertiajs/react';
import { FileText, Image, Inbox, LayoutGrid, Newspaper } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/console',
        icon: LayoutGrid,
    },
    {
        title: 'Pages',
        href: '/console/pages',
        icon: FileText,
    },
    {
        title: 'Insights',
        href: '/console/posts',
        icon: Newspaper,
    },
    {
        title: 'Lead Inbox',
        href: '/console/leads',
        icon: Inbox,
    },
    {
        title: 'Artwork',
        href: '/console/artwork',
        icon: Image,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'View site',
        href: '/en',
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/console" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
