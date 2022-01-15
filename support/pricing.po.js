import { BasePO } from "./base.po";

export class PricingPO extends BasePO {
  baseUrl = "http://localhost:8080";
  pageUrl = "/pricing.html";

  yealyPeriodHeading = "Yearly";
  starterCardHeading = "Starter";
  proCardHeading = "Professional";
  ultimateCardHeading = "Ultimate";

  locators = {
    yearlyPeriodBtn: 'yearly-period-btn',
    rentalNumberInput: 'scroll-prop-plan',
    starterInfoCard: 'div[class$="card-starter"]',
    //XPath selectors
    proInfoCard: '//h6[text()="Professional"]/../../../div',
    ultimateInfoCard: '//h6[text()="Ultimate"]/../../../div'
  }

  cardHeadings = {
    yealyPeriodHeading: "Yearly",
    starterCardHeading: "Starter",
    proCardHeading: "Professional",
    ultimateCardHeading: "Ultimate"
  }

  getYearlyPeriodBtn() {
    return this.getByDataAttribute(this.locators.yearlyPeriodBtn);
  }

  getRentalNumberInput() {
    return this.getByDataAttribute(this.locators.rentalNumberInput);
  }

  getStarterInfoCard() {
    return cy.get(this.locators.starterInfoCard);
  }

  getProInfoCard() {
    return cy.xpath(this.locators.proInfoCard);
  }

  getUltimateInfoCard() {
    return cy.xpath(this.locators.ultimateInfoCard);
  }
}