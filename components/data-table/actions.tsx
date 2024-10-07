"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import Link from "next/link";

export namespace DataTableRowActionsProps {
  export type ActionItem = {
    type: "action";
    label: string;
    action: () => void;
  };

  export type LinkItem = {
    type: "link";
    label: string;
    href: string;
  };

  export type Item = ActionItem | LinkItem;

  export type Items = Item[];
}

export interface DataTableRowActionsProps {
  items: DataTableRowActionsProps.Items;
}

export function DataTableRowActions({ items }: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {generateItems(items)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function generateItems(items: DataTableRowActionsProps.Items) {
  return items.map((item, index) => {
    const isLastItem = index === items.length - 1;
    return (
      <React.Fragment key={index}>
        {item.type === "action" ? (
          <DropdownMenuItem onClick={item.action}>
            {item.label}
          </DropdownMenuItem>
        ) : (
          <Link href={item.href}>
            <DropdownMenuItem>{item.label}</DropdownMenuItem>
          </Link>
        )}
        {!isLastItem && <DropdownMenuSeparator />}
      </React.Fragment>
    );
  });
}
