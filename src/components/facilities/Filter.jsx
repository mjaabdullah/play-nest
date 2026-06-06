"use client";

import { ListBox, Select } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";

const Filter = ({ categories, category }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select
      defaultValue={category || "all"}
      className="w-[256px]"
      defaultSelectedKeys={[category || "all"]}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        if (!e || e === "all") {
          params.delete("category");
        } else {
          params.set("category", e);
        }
        router.push(`?${params.toString().toLowerCase()}`);
      }}
    >
      <Select.Trigger>
        <Select.Value placeholder="Select one" />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox
          onSelectionChange={(keys) => {
            console.log("LISTBOX fired:", keys);
          }}
        >
          <ListBox.Item key="all" id="all" textValue="All Facilities">
            All Facilities
            <ListBox.ItemIndicator />
          </ListBox.Item>
          {categories.map((c) => (
            <ListBox.Item
              key={c.category}
              id={c.category}
              textValue={c.category}
            >
              {c.category}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default Filter;
