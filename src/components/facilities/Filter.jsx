import { ListBox, Select } from "@heroui/react";
const Filter = ({ list }) => {
  return (
    <Select className="w-[256px]" placeholder="Select one">
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          <ListBox.Item id="all" textValue="all">
            All Facilities
            <ListBox.ItemIndicator />
          </ListBox.Item>
        </ListBox>
      </Select.Popover>
    </Select>
  );
};

export default Filter;
