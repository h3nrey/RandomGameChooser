interface GameListCardProps {
    cover: string;
    close: () => void;
}
export default function GameListCard({ cover, close }: GameListCardProps) {

    function handleClose() {
        close()
    }
    return (
        <div className="group relative z-0">
            <img
                className="h-20"
                src={cover}
                alt=""
            />

            <button
                onClick={close}
                className="hidden absolute group-hover:block top-0 right-0 px-1 text-white text__stroke z-10"
            >
                x
            </button>
        </div>
    )
}