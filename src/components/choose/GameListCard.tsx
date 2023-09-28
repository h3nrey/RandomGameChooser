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
                className="h-32"
                src={cover}
                alt=""
            />

            <button
                onClick={close}
                className="hidden text-3xl absolute group-hover:block top-0 right-0 px-2 text-white text__stroke z-10 font-title"
            >
                x
            </button>
        </div>
    )
}