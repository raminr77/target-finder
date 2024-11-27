import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export function Loading({ count = 4 } : { count?: number }) {
    const IsDarkMode: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const THEME_DATA = IsDarkMode ? { baseColor: '#202020', highlightColor: '#444444' } : { baseColor: '#cbd5e1', highlightColor: '#f1f5f9' } as const;

    return (
        <SkeletonTheme {...THEME_DATA}>
            <Skeleton count={count} />
        </SkeletonTheme>
    );
}
