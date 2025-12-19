import React, { useState } from "react";
import { ScrollView } from "react-native";
import ClientActiveState from "~/components/orders/states/client-active-state";
import ClientAwaitingState from "~/components/orders/states/client-awaiting-state";
import ClientEmptyState from "~/components/orders/states/client-empty-state";
import { MOCK_ONGOING_ORDER, type OngoingOrder } from "~/constants/orders";

type ClientOngoingTabProps = {
  onChatOpen: () => void;
};

export default function ClientOngoingTab({ onChatOpen }: ClientOngoingTabProps) {
  const [ongoingOrder] = useState<OngoingOrder | null>(MOCK_ONGOING_ORDER);

  if (!ongoingOrder) {
    return <ClientEmptyState />;
  }

  if (ongoingOrder.status === "awaiting") {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <ClientAwaitingState order={ongoingOrder} />
      </ScrollView>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ClientActiveState initialOrder={ongoingOrder} onChatOpen={onChatOpen} />
    </ScrollView>
  );
}
