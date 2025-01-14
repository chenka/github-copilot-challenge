import React from "react"

const HabitCalendar: React.FC = () => {
  return (
    <div>
      {/* Habit Title */}
      <div className="px-4 mb-4">
        <div className="flex items-center">
          <span className="text-yellow-400 text-2xl">🧘</span>
          <h2 className="ml-2 text-blue-400 text-lg font-semibold">Meditate</h2>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-4">
        <div className="bg-gray-800 rounded-lg p-4">
          <h3 className="text-center text-lg mb-4">January 2025</h3>
          <div className="grid grid-cols-7 text-center text-gray-400 text-sm">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="grid grid-cols-7 text-center mt-4 text-white text-sm">
            <div className="text-gray-600">29</div>
            <div className="text-gray-600">30</div>
            <div className="text-gray-600">31</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
            <div className="bg-blue-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center">
              10
            </div>
            <div className="bg-blue-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center">
              11
            </div>
            <div>12</div>
            <div className="bg-blue-500 rounded-full w-8 h-8 mx-auto flex items-center justify-center">
              13
            </div>
            <div>14</div>
            <div>15</div>
            <div>16</div>
            <div>17</div>
            <div>18</div>
            <div>19</div>
            <div>20</div>
            <div>21</div>
            <div>22</div>
            <div>23</div>
            <div>24</div>
            <div>25</div>
            <div>26</div>
            <div>27</div>
            <div>28</div>
            <div>29</div>
            <div>30</div>
            <div>31</div>
            <div className="text-gray-600">1</div>
            <div className="text-gray-600">2</div>
            <div className="text-gray-600">3</div>
            <div className="text-gray-600">4</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-0 inset-x-0 bg-black border-t border-gray-700">
        <div className="flex justify-between items-center px-4 py-2">
          <button className="text-blue-500 text-sm">Today</button>
          <button className="text-blue-500 text-sm">January</button>
          <button className="text-gray-500 text-sm">2025</button>
          <button className="text-gray-500 text-sm">Share</button>
          <button className="text-blue-500 text-sm">Settings</button>
        </div>
      </div>
    </div>
  )
}

export default HabitCalendar
