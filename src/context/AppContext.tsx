import React, { createContext, useContext, useState } from 'react';
import { Event, RSVP, Notification } from '../types';
import { mockEvents, mockNotifications, mockRSVPs } from '../data/mockData';

interface AppContextType {
  events: Event[];
  bookmarkedEvents: string[];
  rsvps: RSVP[];
  notifications: Notification[];
  unreadNotificationsCount: number;
  bookmarkEvent: (eventId: string) => void;
  unbookmarkEvent: (eventId: string) => void;
  rsvpToEvent: (eventId: string) => void;
  cancelRSVP: (eventId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [events] = useState<Event[]>(mockEvents);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>(mockRSVPs);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const bookmarkEvent = (eventId: string) => {
    setBookmarkedEvents((prev) => [...prev, eventId]);
  };

  const unbookmarkEvent = (eventId: string) => {
    setBookmarkedEvents((prev) => prev.filter((id) => id !== eventId));
  };

  const rsvpToEvent = (eventId: string) => {
    const newRSVP: RSVP = {
      id: Math.random().toString(36).substr(2, 9),
      eventId,
      userId: '1', // Current user
      status: 'confirmed',
      checkedIn: false,
      createdAt: new Date().toISOString(),
    };
    setRsvps((prev) => [...prev, newRSVP]);
    
    // Add notification
    addNotification({
      userId: '1',
      type: 'rsvp',
      title: 'RSVP Confirmed',
      message: 'Your RSVP has been confirmed',
      read: false,
      createdAt: new Date().toISOString(),
      icon: '✅',
    });
  };

  const cancelRSVP = (eventId: string) => {
    setRsvps((prev) => prev.filter((rsvp) => rsvp.eventId !== eventId));
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        events,
        bookmarkedEvents,
        rsvps,
        notifications,
        unreadNotificationsCount,
        bookmarkEvent,
        unbookmarkEvent,
        rsvpToEvent,
        cancelRSVP,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
