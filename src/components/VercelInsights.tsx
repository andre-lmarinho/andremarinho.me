"use client";

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const automatedUserAgent = /(?:Chrome-Lighthouse|HeadlessChrome)/i;

export const isAutomatedBrowser = ({
  userAgent,
  webdriver,
}: Pick<Navigator, "userAgent" | "webdriver">) =>
  webdriver || automatedUserAgent.test(userAgent);

const shouldDiscardEvent = () => isAutomatedBrowser(navigator);

export default function VercelInsights() {
  return (
    <>
      <SpeedInsights
        beforeSend={(event) => (shouldDiscardEvent() ? null : event)}
      />
      <Analytics
        beforeSend={(event: BeforeSendEvent) =>
          shouldDiscardEvent() ? null : event
        }
      />
    </>
  );
}
