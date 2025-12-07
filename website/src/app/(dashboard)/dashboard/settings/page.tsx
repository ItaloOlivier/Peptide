'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Mail,
  Bell,
  Lock,
  Globe,
  Calendar,
  Save,
  Camera,
} from 'lucide-react'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '',
    dateOfBirth: '',
    gender: '',
    weight: '',
    weightUnit: 'lbs',
    height: '',
    heightUnit: 'inches',
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    injectionReminders: true,
    weeklyReports: true,
    protocolUpdates: true,
  })

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Updating profile:', profileData)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Updating notifications:', notificationSettings)
      alert('Notification settings updated successfully!')
    } catch (error) {
      console.error('Error updating notifications:', error)
      alert('Failed to update notifications')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar
                    src={undefined}
                    alt={profileData.name}
                    fallback={profileData.name}
                    size="lg"
                  />
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{profileData.name}</h3>
                <p className="text-sm text-slate-400">{profileData.email}</p>
                <Badge className="mt-2">Pro Member</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-sm">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Member Since</span>
                <span className="text-white">Jan 2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Active Protocols</span>
                <span className="text-white">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Total Injections</span>
                <span className="text-white">156</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    label="Email Address"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="tel"
                    label="Phone Number"
                    placeholder="+1 (555) 123-4567"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                  <Input
                    type="date"
                    label="Date of Birth"
                    value={profileData.dateOfBirth}
                    onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                  />
                </div>

                <Select
                  label="Gender"
                  value={profileData.gender}
                  onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                >
                  <option value="">Select gender...</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </Select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="number"
                        label="Weight"
                        placeholder="185"
                        step="0.1"
                        value={profileData.weight}
                        onChange={(e) => setProfileData({ ...profileData, weight: e.target.value })}
                      />
                    </div>
                    <Select
                      label="Unit"
                      value={profileData.weightUnit}
                      onChange={(e) => setProfileData({ ...profileData, weightUnit: e.target.value })}
                      className="w-24"
                    >
                      <option value="lbs">lbs</option>
                      <option value="kg">kg</option>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        type="number"
                        label="Height"
                        placeholder="70"
                        step="0.1"
                        value={profileData.height}
                        onChange={(e) => setProfileData({ ...profileData, height: e.target.value })}
                      />
                    </div>
                    <Select
                      label="Unit"
                      value={profileData.heightUnit}
                      onChange={(e) => setProfileData({ ...profileData, heightUnit: e.target.value })}
                      className="w-24"
                    >
                      <option value="inches">in</option>
                      <option value="cm">cm</option>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" isLoading={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNotificationSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">Email Notifications</p>
                      <p className="text-xs text-slate-400">Receive notifications via email</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          emailNotifications: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-primary-500 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">Injection Reminders</p>
                      <p className="text-xs text-slate-400">Get reminded before scheduled injections</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.injectionReminders}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          injectionReminders: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-primary-500 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">Weekly Reports</p>
                      <p className="text-xs text-slate-400">Receive weekly progress summaries</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyReports}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          weeklyReports: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-primary-500 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">Protocol Updates</p>
                      <p className="text-xs text-slate-400">Get notified about protocol changes</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.protocolUpdates}
                      onChange={(e) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          protocolUpdates: e.target.checked,
                        })
                      }
                      className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-primary-500 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button type="submit" isLoading={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Security
              </CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-2" />
                Two-Factor Authentication
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
