import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import {
	BCard,
	BCardHeader,
	BCardTitle,
	BCardSubtitle,
	BCardContent,
	BCardFooter,
} from "./";

describe("BCard", () => {
	describe("Props", () => {
		it("renders with default props", () => {
			const wrapper = mount(BCard);
			expect(wrapper.classes()).toContain("b-card");
			expect(wrapper.classes()).toContain("b-card--variant-elevated");
			expect(wrapper.classes()).toContain("b-card--padding-md");
		});

		it("applies variant classes correctly", () => {
			const variants = ["elevated", "outlined", "filled", "flat"] as const;
			variants.forEach((variant) => {
				const wrapper = mount(BCard, {
					props: { variant },
				});
				expect(wrapper.classes()).toContain(`b-card--variant-${variant}`);
			});
		});

		it("applies padding classes correctly", () => {
			const paddings = ["none", "sm", "md", "lg", "xl"] as const;
			paddings.forEach((padding) => {
				const wrapper = mount(BCard, {
					props: { padding },
				});
				expect(wrapper.classes()).toContain(`b-card--padding-${padding}`);
			});
		});

		it("renders title and subtitle when provided", () => {
			const wrapper = mount(BCard, {
				props: {
					title: "Test Title",
					subtitle: "Test Subtitle",
				},
			});
			expect(wrapper.text()).toContain("Test Title");
			expect(wrapper.text()).toContain("Test Subtitle");
		});

		it("applies clickable attributes correctly", () => {
			const wrapper = mount(BCard, {
				props: { clickable: true },
			});
			expect(wrapper.classes()).toContain("b-card--clickable");
			expect(wrapper.attributes("tabindex")).toBe("0");
			expect(wrapper.attributes("role")).toBe("button");
		});

		it("applies disabled state correctly", () => {
			const wrapper = mount(BCard, {
				props: {
					clickable: true,
					disabled: true,
				},
			});
			expect(wrapper.classes()).toContain("b-card--disabled");
			expect(wrapper.attributes("aria-disabled")).toBe("true");
			expect(wrapper.attributes("tabindex")).toBeUndefined();
		});
	});

	describe("Slots", () => {
		it("renders default slot content", () => {
			const wrapper = mount(BCard, {
				slots: {
					default: "<p>Card content</p>",
				},
			});
			expect(wrapper.text()).toContain("Card content");
		});

		it("renders header slot", () => {
			const wrapper = mount(BCard, {
				slots: {
					header: "<div>Custom header</div>",
				},
			});
			expect(wrapper.text()).toContain("Custom header");
		});

		it("renders footer slot", () => {
			const wrapper = mount(BCard, {
				slots: {
					footer: "<div>Custom footer</div>",
				},
			});
			expect(wrapper.text()).toContain("Custom footer");
		});
	});

	describe("Sub-components", () => {
		it("BCardHeader renders correctly", () => {
			const wrapper = mount(BCardHeader, {
				slots: {
					default: "Header content",
				},
			});
			expect(wrapper.classes()).toContain("b-card-header");
			expect(wrapper.text()).toBe("Header content");
		});

		it("BCardTitle renders correctly", () => {
			const wrapper = mount(BCardTitle, {
				slots: {
					default: "Title text",
				},
			});
			expect(wrapper.classes()).toContain("b-card-title");
			expect(wrapper.text()).toBe("Title text");
			expect(wrapper.element.tagName.toLowerCase()).toBe("h3");
		});

		it("BCardTitle renders with custom tag", () => {
			const wrapper = mount(BCardTitle, {
				props: { tag: "h2" },
				slots: {
					default: "Title text",
				},
			});
			expect(wrapper.element.tagName.toLowerCase()).toBe("h2");
		});

		it("BCardSubtitle renders correctly", () => {
			const wrapper = mount(BCardSubtitle, {
				slots: {
					default: "Subtitle text",
				},
			});
			expect(wrapper.classes()).toContain("b-card-subtitle");
			expect(wrapper.text()).toBe("Subtitle text");
		});

		it("BCardContent renders correctly", () => {
			const wrapper = mount(BCardContent, {
				slots: {
					default: "Content text",
				},
			});
			expect(wrapper.classes()).toContain("b-card-content");
			expect(wrapper.text()).toBe("Content text");
		});

		it("BCardFooter renders correctly", () => {
			const wrapper = mount(BCardFooter, {
				slots: {
					default: "Footer text",
				},
			});
			expect(wrapper.classes()).toContain("b-card-footer");
			expect(wrapper.text()).toBe("Footer text");
		});
	});

	describe("Integration", () => {
		it("renders complete card with all sub-components", () => {
			const wrapper = mount(BCard, {
				slots: {
					default: `
						<BCardHeader>
							<BCardTitle>Title</BCardTitle>
							<BCardSubtitle>Subtitle</BCardSubtitle>
						</BCardHeader>
						<BCardContent>Content</BCardContent>
						<BCardFooter>Footer</BCardFooter>
					`,
				},
				global: {
					components: {
						BCardHeader,
						BCardTitle,
						BCardSubtitle,
						BCardContent,
						BCardFooter,
					},
				},
			});

			expect(wrapper.text()).toContain("Title");
			expect(wrapper.text()).toContain("Subtitle");
			expect(wrapper.text()).toContain("Content");
			expect(wrapper.text()).toContain("Footer");
		});
	});
});
