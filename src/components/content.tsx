import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

type ContentProps = {
    title?: string;
};

export function Content({ title }: ContentProps) {
    const IsDarkMode: boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const THEME_DATA = IsDarkMode ? { baseColor: '#202020', highlightColor: '#444444' } : { baseColor: '#cbd5e1', highlightColor: '#f1f5f9' } as const;

    return (
        <div className='px-4'>
            <SkeletonTheme {...THEME_DATA}>
                {title ? title : <Skeleton count={1} />}
            </SkeletonTheme>
        </div>
    );
}
