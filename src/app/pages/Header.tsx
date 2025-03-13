'use client';
import { Button } from "@/components/ui/button";
import { Context } from '@/worker';
import { Logo } from '../../components/common/Logo';

export const Header = ({ ctx }: { ctx: Context }) => {
    const user = ctx.user;
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
            <div className="text-sea-medium">

                <a href="/" className="flex items-center gap-2">
                    <Logo />
                    <h1 className="text-xl font-bold">Boat Lists</h1>
                </a>
            </div>

            <nav className="flex gap-4 items-center">
                <a href="/list/lists" className="text-sea-medium hover:text-sea-dark">
                    Browse Lists
                </a>
                {user ? (
                    <Button asChild>
                        <a href='/user/logout'>Logout</a>
                    </Button>
                ) : (
                    <Button asChild>
                        <a href='/user/login'>Login</a>
                    </Button>
                )}
            </nav>
        </header>
    );
};
