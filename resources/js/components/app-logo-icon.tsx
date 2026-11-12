import type { ImgHTMLAttributes } from 'react';
import mark from '../../assets/logo-mark.png';
import { cn } from '@/lib/utils';

export default function AppLogoIcon({
    className,
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src={mark}
            alt="DARA Capital"
            className={cn('object-contain', className)}
            {...props}
        />
    );
}
