import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Modify } from '../../../types/utility.js'
import { CardBlock, CardBlockProps } from './CardBlock.jsx'

export type CardItemProps = Modify<
  CardBlockProps,
  {
    prefixClassName?: string
    suffixClassName?: string
    labelClassName?: string
    valueClassName?: string
    disabled?: boolean
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    label?: React.ReactNode
    value?: React.ReactNode
    children?: never
  }
>

export const CardItem = React.forwardRef<HTMLDivElement, CardItemProps>(
  function CardButton(
    {
      className,
      prefixClassName,
      suffixClassName,
      labelClassName,
      valueClassName,
      disabled,
      prefix,
      suffix,
      label,
      value,
      onClick,
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (onClick && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          event.currentTarget.click()
        }

        onKeyDown?.(event)
      },
      [onClick, onKeyDown],
    )

    return (
      <CardBlock
        ref={ref}
        className={twMerge(
          !!onClick && 'cursor-pointer hover:bg-tertiary active:bg-tertiary',
          disabled && 'pointer-events-none',
          className,
        )}
        aria-disabled={!onClick || disabled ? 'true' : 'false'}
        tabIndex={0}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {!!prefix && (
          <div className={twMerge('flex-none', prefixClassName)}>{prefix}</div>
        )}
        <div className={twMerge('flex-auto truncate', labelClassName)}>
          {label}
          {!!value && (
            <span className="hidden" aria-label=":" aria-hidden="false" />
          )}
        </div>
        {!!value && (
          <div className={twMerge('flex-none', valueClassName)}>{value}</div>
        )}
        {!!suffix && (
          <div className={twMerge('flex-none', suffixClassName)}>{suffix}</div>
        )}
      </CardBlock>
    )
  },
)
