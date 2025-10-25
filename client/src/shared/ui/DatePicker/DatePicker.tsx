'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useState } from 'react';

import { Button } from '../Button';
import { Calendar } from '../Calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';

type TDate = Date | undefined;

type DatePickerProps = {
  value?: TDate;
  onChange: (date: TDate) => void;
};

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (date: TDate) => {
    if (date) {
      onChange(date);
      setOpen(false);
    }
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange(undefined);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Button
            type="button"
            variant="ghost"
            data-empty={!value}
            className=" data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal dark:bg-input/30 dark:hover:bg-input/50 rounded-md border border-input"
          >
            <CalendarIcon />
            {value ? format(value, 'PPP') : <span>Pick a date</span>}
          </Button>
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute size-6 right-2 top-1/2 -translate-y-1/2"
              onClick={handleReset}
            >
              <X className="size-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          defaultMonth={value}
          captionLayout="dropdown"
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker };
