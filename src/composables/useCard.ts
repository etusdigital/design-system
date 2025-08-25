import { computed, type ComputedRef } from "vue";

export interface UseCardProps {
	variant?: "elevated" | "outlined" | "filled" | "flat";
	padding?: "none" | "sm" | "md" | "lg" | "xl";
	shadow?: "none" | "sm" | "md" | "lg" | "xl";
	radius?: "none" | "sm" | "md" | "lg" | "full";
	clickable?: boolean;
	disabled?: boolean;
	className?: string;
}

export interface UseCardReturn {
	cardClasses: ComputedRef<any[]>;
	isInteractive: ComputedRef<boolean>;
	cardProps: ComputedRef<Record<string, any>>;
}

export function useCard(props: UseCardProps): UseCardReturn {
	const isInteractive = computed(() => !!props.clickable && !props.disabled);

	const cardClasses = computed(() =>
		[
			"b-card",
			`b-card--variant-${props.variant || "elevated"}`,
			`b-card--padding-${props.padding || "md"}`,
			`b-card--shadow-${props.shadow || "sm"}`,
			`b-card--radius-${props.radius || "md"}`,
			{
				"b-card--clickable": props.clickable,
				"b-card--disabled": props.disabled,
			},
			props.className,
		].filter(Boolean)
	);

	const cardProps = computed(() => ({
		tabindex: isInteractive.value ? 0 : undefined,
		role: props.clickable ? "button" : undefined,
		"aria-disabled": props.disabled || undefined,
	}));

	return {
		cardClasses,
		isInteractive,
		cardProps,
	};
}
