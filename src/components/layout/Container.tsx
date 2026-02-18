/**
 * 페이지의 중앙에 콘텐츠를 배치하고 최대 너비를 설정하는 베이스 역할
 */
export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            {children}
        </div>
    );
}