import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            className={cn(
                'peer size-4 shrink-0 rounded-[2px] border border-[#a0bfd1] bg-transparent',
                'data-[state=checked]:bg-transparent data-[state=checked]:border-[#7cc4fc]',
                'focus-visible:ring-2 focus-visible:ring-[#7cc4fc]',
                'disabled:opacity-50 disabled:cursor-not-allowed ',
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="flex items-center justify-center text-[#35a0f4]"
            >
                <CheckIcon className="w-4 h-4" strokeWidth={3} />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
