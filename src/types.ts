/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ChatMessage {
  id: string;
  sender: "paulo" | "carol";
  text: string;
  timestamp?: string;
  isFirst?: boolean;
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  description?: string;
}

export type ProposalStatus = "pending" | "declined" | "accepted";

export interface SystemConfig {
  smtpConfigured: boolean;
  appUrl: string;
}
