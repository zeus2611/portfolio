import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion';

const links = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    { path: '/certificates', label: 'Certificates' },
    { path: '/contact', label: 'Contact' }
    
]

const Nav = ({ containerStyles, linkStyles, underlineStyles }) => {
    const path = usePathname();
    return (
        <nav className={`${containerStyles}`}>
            {links.map((link, index) => {
                return (
                    <Link
                        href={link.path}
                        key={index}
                        className={`capitalize ${linkStyles}`}
                    >
                        {link.path === path && (
                            <motion.sapn
                                initial={{ y: '-100%' }}
                                animate={{ y: 0 }}
                                transition={{ type: 'tween' }}
                                layoutId="underline"
                                className={`${underlineStyles}`}
                            />
                        )}
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}

export default Nav;