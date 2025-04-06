/* eslint-disable react/prop-types */
function EventTile({ event, onClick }) {
  return (
    <div
      key={event.id}
      className="relative group cursor-pointer bg-gray-700 bg-cover bg-center rounded-2xl w-56 h-56 transition-all duration-300 ease-in-out hover:w-96"
      style={{
        backgroundImage: event.file ? `url(${event.file.url})` : "none",
        borderRadius: "1rem",
      }}
      
      onClick={() => onClick(event)}
    >
      <div
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.5), rgba(0,0,0,0.7))",
          borderRadius: "1rem",
        }}
        className="relative flex gap-1 items-center justify-between rounded-2xl w-full h-full backdrop-blur-sm p-5"
      >
        <div className="flex flex-col gap-1 items-start justify-center w-fit h-fit">
          <p className="text-2xl text-left font-bold">{event.eventname}</p>
          <p className="text-base text-left font-semibold">{event.description}</p>
          <p className="text-sm">
            {new Date(event.startDate).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="absolute self-center top-0 bottom-0 my-auto right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 flex flex-col items-end">
          <p className="text-sm font-light text-right leading-3">
            <span className="text-xl font-bold">{event.images} </span>
            <br /> Images
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventTile;
