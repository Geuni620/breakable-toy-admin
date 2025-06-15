import { Input } from "@/components/ui/input";
import { Route } from "@/routes/index";

export const SearchInput = () => {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <Input
      type="text"
      placeholder="Search"
      className="w-3xs"
      value={search.email}
      onChange={(e) =>
        navigate({
          search: (prev) => ({
            ...prev,
            email: e.target.value,
          }),
        })
      }
    />
  );
};
