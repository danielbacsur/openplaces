import { type Place } from "openplaces";

function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating * 2) / 2;
  const full = Math.floor(rounded);
  const half = rounded - full === 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const src = (kind: "" | "_half" | "_empty") => `/ic_star_rate${kind}_14.png`;
  return (
    <span className="mt-[3px] inline-flex align-top">
      {Array.from({ length: full }).map((_, i) => (
        <img key={`f${i}`} src={src("")} alt="" className="size-[14px]" />
      ))}
      {half && <img src={src("_half")} alt="" className="size-[14px]" />}
      {Array.from({ length: empty }).map((_, i) => (
        <img key={`e${i}`} src={src("_empty")} alt="" className="size-[14px]" />
      ))}
    </span>
  );
}

const row = "text-[14px] leading-5 tracking-[0.1px] text-[#5e5e5e]";

export function ResultCard({ place }: { place: Place }) {
  const location = place.street ?? place.address;
  const price = place.price ?? place.priceRange;

  return (
    <div className="pb-4">
      <a
        href={`https://www.google.com/maps/place/?q=place_id:${place.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block cursor-pointer"
      >
        {place.sponsored && (
          <div className="flex items-center pt-[15px] pb-[9px] pr-4 pl-6">
            <span className="text-[14px] leading-none font-bold text-[#1f1f1f]">
              Sponsored
            </span>
            <span
              className="material-symbols-outlined ml-1 leading-none text-[#5e5e5e]"
              style={{ fontSize: "16px" }}
            >
              more_vert
            </span>
          </div>
        )}

        <div
          className={`flex gap-4 pr-4 pl-6 ${place.sponsored ? "" : "pt-4"}`}
        >
          <div className="min-w-0 flex-1">
            <div className="mb-0.5 truncate text-[16px] leading-5 font-medium text-[#1f1f1f]">
              {place.name}
            </div>

            {place.rating != null && (
              <div className={row}>
                <span className="mr-1">{place.rating.toFixed(1)}</span>
                <Stars rating={place.rating} />
                {place.reviews && (
                  <span className="pl-1">({place.reviews})</span>
                )}
                <img
                  src="/info_grey.png"
                  alt=""
                  className="ml-[3px] inline-block size-[18px] -translate-y-px align-middle"
                />
                {price && ` · ${price.replace(/ /g, " ")}`}
              </div>
            )}

            {(place.category || location) && (
              <div className={row}>
                {place.category}
                {place.category && (place.accessible || location) && " · "}
                {place.accessible && (
                  <>
                    <span
                      className="material-symbols-outlined inline-block -translate-y-0.5 align-middle leading-none text-[#0b57d0]"
                      style={{ fontSize: "15px" }}
                    >
                      accessible_forward
                    </span>
                    {location && " · "}
                  </>
                )}
                {location}
              </div>
            )}

            {place.description && (
              <div className={`truncate ${row}`}>{place.description}</div>
            )}

            {place.hours && (
              <div className={row}>
                <span style={{ color: place.hours.color }}>
                  {place.hours.status}
                </span>
                {place.hours.detail &&
                  ` · ${place.hours.detail.replace(/ ([ap]m)/g, " $1")}`}
              </div>
            )}
          </div>

          {place.image && (
            <img
              src={place.image.replace(/=[^=/]*$/, "") + "=w168-h168-k-no"}
              alt=""
              className="mb-1 size-[84px] shrink-0 rounded-lg object-cover"
            />
          )}
        </div>

        {place.sponsored && place.services && (
          <div className={`flex items-center pt-2 pr-4 pl-6 ${row}`}>
            {place.services.slice(0, 3).map((s, i) => (
              <span key={s.label} className="flex items-center">
                {i > 0 && <span className="px-1.5">·</span>}
                <img
                  src={s.available ? "/done_green.png" : "/close_red.png"}
                  alt=""
                  className="mr-1.5 size-[18px]"
                />
                {s.label}
              </span>
            ))}
          </div>
        )}

        {/* {place.review && (
          <div className="flex items-center gap-1 pt-2 pr-[34px] pl-6">
            <img
              src="/default_user.png"
              alt=""
              className="size-4 shrink-0 rounded-full"
            />
            <span className={`line-clamp-2 ${row}`}>{place.review}</span>
          </div>
        )} */}
      </a>

      {place.reserve && (
        <a
          href={place.reserve}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-6 pt-2 pb-1"
        >
          <div className="flex h-10 items-center justify-center rounded-[20px] bg-[#d3f7ff] text-[#014f5a]">
            <span
              className="material-symbols-outlined mr-2"
              style={{ fontSize: "18px" }}
            >
              event
            </span>
            <span className="text-[14px] leading-5 font-medium tracking-[0.1px]">
              Reserve a table
            </span>
          </div>
        </a>
      )}
    </div>
  );
}
