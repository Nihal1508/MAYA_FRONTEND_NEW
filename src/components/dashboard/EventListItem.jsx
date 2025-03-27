function EventListItem({ event, type }) {
  return (
    <div
      className={`py-2 pl-8 pr-8 border-l-4 w-full border-purplePrimary bg-gradient-to-r ${
        type === "now"
          ? "from-[#A192FF44] to-transparent"
          : "to-[#A192FF44] from-transparent"
      }`}
    >
      <h2 className="text-left line-clamp-1">
        {event.eventname} - {event.description}
      </h2>
    </div>
  );
}

export default EventListItem;
