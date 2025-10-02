type FiltersType = {
  state?: string | string[];
  stream?: string | string[];
  instituteType?: string | string[];
  tag?: string | string[];
  searchTerm?: string;
  minFees?: string;
  maxFees?: string;
  minPlacementRate?: string;
};

export function generateTitleAndDescription(filters: FiltersType) {
  // Use const because searchTerm is never reassigned
  const { state, stream, instituteType, tag, searchTerm } = filters;

  // Use let only for variables which may change
  const normalizedState: string[] =
    typeof state === "string"
      ? state.split(",").filter(Boolean)
      : Array.isArray(state)
      ? state
      : [];
  const normalizedStream: string[] =
    typeof stream === "string"
      ? stream.split(",").filter(Boolean)
      : Array.isArray(stream)
      ? stream
      : [];
  const normalizedInstituteType: string[] =
    typeof instituteType === "string"
      ? instituteType.split(",").filter(Boolean)
      : Array.isArray(instituteType)
      ? instituteType
      : [];
  const normalizedTag: string[] =
    typeof tag === "string"
      ? tag.split(",").filter(Boolean)
      : Array.isArray(tag)
      ? tag
      : [];

  let title = "Colleges in India | Pncsquare";
  let description =
    "Discover top colleges across India. Find comprehensive info on admissions, placements, fees, and campus life.";

  if (normalizedState.length && normalizedStream.length) {
    title = `${normalizedStream.join(", ")} Colleges in ${normalizedState.join(
      ", "
    )}`;
    description = `Explore ${normalizedStream.join(
      ", "
    )} colleges in ${normalizedState.join(
      ", "
    )}. Admission, placement, campus, info and more. | Pncsquare`;
  } else if (normalizedStream.length) {
    title = `${normalizedStream.join(", ")} Colleges in India`;
    description = `Top ${normalizedStream.join(
      ", "
    )} colleges in India. Info on fees, placements, and more. | Pncsquare`;
  } else if (normalizedState.length) {
    title = `Colleges in ${normalizedState.join(", ")}`;
    description = `Find the best colleges in ${normalizedState.join(
      ", "
    )}. Compare placements, fees, and details. | Pncsquare`;
  }

  if (normalizedTag.length) {
    title = `${normalizedTag.join(", ")} ${title}`;
  }
  if (normalizedInstituteType.length) {
    title = `${normalizedInstituteType.join(", ")} ${title}`;
  }
  if (searchTerm) {
    title = `${searchTerm} - ${title}`;
    description = `Search results for '${searchTerm}' among colleges. Find info on fees, placements, admissions, and more.`;
  }

  return { title, description };
}
