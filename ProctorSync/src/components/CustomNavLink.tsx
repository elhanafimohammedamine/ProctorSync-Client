import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {cn} from "@/lib/utils.ts";

interface CustomNavLinkProps {
    to: string;
    contains: string;
    children: React.ReactNode;
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, contains, children }) => {
    const location = useLocation();
    const isActive = location.pathname.includes(contains);

    return (
        <Link to={to} className={cn(isActive ? "bg-blue-200 dark:bg-accent text-accent-foreground" : "text-muted-foreground", "flex items-center gap-4 py-2 px-2.5 rounded-lg hover:text-accent-foreground hover:bg-blue-200  dark:hover:bg-accent  transition-colors")}>
            {children}
        </Link>
    );
};

export default CustomNavLink;
