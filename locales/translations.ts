
export interface Translation {
  ui: {
    // General
    appName: string;
    submit: string;
    next: string;
    back: string;
    save: string;
    confirm: string;
    // Sidebar
    navDashboard: string;
    navWeatherHub: string;
    navWaterManage: string;
    navCostManager: string;
    navDiseaseScanner: string;
    navStorageManager: string;
    navProfitEngine: string;
    navMarketIntel: string;
    navNotebook: string;
    navStrategicAdvisor: string;
    // Header
    headerStatus: string;
    headerStatusText: string;
    // Farm Setup Wizard
    farmSetupTitle: string;
    farmSetupSubtitle: string;
    farmSetupLanguageSelectPrompt: string;
    farmSetupStep1: string;
    farmSetupStep2: string;
    farmSetupStep3: string;
    farmSetupStep4: string;
    farmSetupLocationTitle: string;
    farmSetupLocationDesc: string;
    farmSetupLocationLabel: string;
    farmSetupLocationPlaceholder: string;
    farmSetupUseGPS: string;
    farmSetupGeocoding: string;
    farmSetupBasicsTitle: string;
    farmSetupBasicsDesc: string;
    farmSetupLandSizeLabel: string;
    farmSetupSoilTypeLabel: string;
    farmSetupCropsLabel: string;
    farmSetupCropsPlaceholder: string;
    farmSetupInfraTitle: string;
    farmSetupInfraDesc: string;
    farmSetupSeasonLabel: string;
    farmSetupWaterSourceLabel: string;
    farmSetupIrrigationLabel: string;
    farmSetupMachineryLabel: string;
    farmSetupMachineryPlaceholder: string;
    farmSetupConfirmTitle: string;
    farmSetupConfirmDesc: string;
    farmSetupConfirmLabelLocation: string;
    farmSetupConfirmLabelLand: string;
    farmSetupConfirmLabelSoil: string;
    farmSetupConfirmLabelCrops: string;
    farmSetupConfirmLabelSeason: string;
    farmSetupConfirmLabelWater: string;
    farmSetupConfirmLabelIrrigation: string;
    farmSetupConfirmLabelMachinery: string;
    farmSetupCompleteButton: string;
    // Dashboard
    dashboardTitle: string;
    dashboardSubtitle: string;
    kpiTotalInvestment: string;
    kpiCostPerAcre: string;
    kpiCropCount: string;
    kpiLandSize: string;
    quickAccess: string;
    aiInsightsTitle: string;
    debtPressureTitle: string;
    debtPressureLow: string;
    debtPressureModerate: string;
    debtPressureHigh: string;
    rainFailureTitle: string;
    cropSwitchTitle: string;
    viewStrategies: string;
    weatherWidgetTitle: string;
    waterWidgetTitle: string;
    viewDetails: string;
    // Cost Manager
    costManagerTitle: string;
    costManagerSubtitle: string;
    costCategorySeeds: string;
    costCategoryFertilizers: string;
    costCategoryPesticides: string;
    costCategoryLabor: string;
    costCategoryMachinery: string;
    costCategoryUtilities: string;
    costLabelQuantity: string;
    costLabelCost: string;
    costLabelType: string;
    costLabelDays: string;
    costLabelWages: string;
    costLabelUsageHours: string;
    costLabelFuelCost: string;
    costLabelElectricity: string;
    costLabelIrrigation: string;
    costLabelTransport: string;
    costLabelStorage: string;
    costAddFertilizer: string;
    costAddPesticide: string;
    costTotalInvestment: string;
    costPerAcre: string;
    costUpdateButton: string;
    // Disease Scanner
    diseaseScannerTitle: string;
    diseaseScannerSubtitle: string;
    diseaseScannerUploadLabel: string;
    diseaseScannerUploadButton: string;
    diseaseScannerAnalyzing: string;
    diseaseScannerError: string;
    diseaseScannerResultTitle: string;
    diseaseScannerResultConfidence: string;
    diseaseScannerResultSeverity: string;
    diseaseScannerResultExplanation: string;
    diseaseScannerResultTreatment: string;
    diseaseScannerResultCost: string;
    diseaseScannerResultPrevention: string;
    // Storage Manager
    storageManagerTitle: string;
    storageManagerSubtitle: string;
    storageManagerInputs: string;
    storageCropLabel: string;
    storageHarvestedQtyLabel: string;
    storageHarvestedQtyPlaceholder: string;
    storageTypeLabel: string;
    storageCapacityLabel: string;
    storageCapacityPlaceholder: string;
    storageSpoilageRateLabel: string;
    storageUpdateButton: string;
    storageDashboard: string;
    storageRemainingCapacity: string;
    storageSpoilageForecast: string;
    storageWeek: string;
    storageProjectedLoss: string;
    // Profit Engine
    profitEngineTitle: string;
    profitEngineSubtitle: string;
    profitEngineInputs: string;
    profitEngineYieldLabel: string;
    profitEngineYieldPlaceholder: string;
    profitEnginePriceLabel: string;
    profitEnginePricePlaceholder: string;
    profitEngineAnalysis: string;
    profitEngineTotalRevenue: string;
    profitEngineNetProfit: string;
    profitEngineBreakEven: string;
    profitEngineChartTitle: string;
    // Market Intel
    marketIntelTitle: string;
    marketIntelSubtitle: string;
    marketIntelLocalPriceLabel: string;
    marketIntelLocalPricePlaceholder: string;
    marketIntelGetAnalysis: string;
    marketIntelAnalyzing: string;
    marketIntelError: string;
    marketIntelAnalysisTitle: string;
    marketIntelPriceTrend: string;
    marketIntelSellVsStore: string;
    marketIntelDecision: string;
    marketIntelSellNow: string;
    marketIntelStoreFor: string;
    marketIntelWeeks: string;
    marketIntelRecommendation: string;
    // Farm Notebook
    notebookTitle: string;
    notebookSubtitle: string;
    notebookAddNotePlaceholder: string;
    notebookAddNoteButton: string;
    notebookListening: string;
    // Strategic Advisor
    advisorTitle: string;
    advisorSubtitle: string;
    advisorRainFailureTitle: string;
    advisorRainFailureDesc: string;
    advisorCropSwitchTitle: string;
    advisorCropSwitchDesc: string;
    advisorCurrentPlan: string;
    advisorSimulatedPlan: string;
    advisorEstProfit: string;
    advisorWaterReq: string;
    advisorRiskLevel: string;
    advisorSimulateBtn: string;
    // Weather Hub
    weatherTitle: string;
    weatherSubtitle: string;
    weatherCurrent: string;
    weatherForecast: string;
    weatherAdvisory: string;
    weatherFeelsLike: string;
    weatherHumidity: string;
    weatherWind: string;
    // Water Management
    waterTitle: string;
    waterSubtitle: string;
    waterWeeklyUsage: string;
    waterNextIrrigation: string;
    waterLogEvent: string;
    waterLogDate: string;
    waterLogDuration: string;
    waterLogDurationUnit: string;
    waterLogButton: string;
    waterHistory: string;
    waterAITip: string;
    // General UI
    micPermissionDenied: string;
    gpsPermissionDenied: string;
    // --- GRANULAR VOICE KEYS ---
    // Farm Setup
    speakSoilType: string;
    speakCrops: string;
    speakSeason: string;
    speakWaterSource: string;
    speakIrrigation: string;
    speakMachinery: string;
    speakCompleteSetupBtn: string;
    // Cost Manager
    speakSeedsQty: string;
    speakSeedsCost: string;
    speakFertilizerType: string;
    speakFertilizerQty: string;
    speakFertilizerCost: string;
    speakAddFertilizerBtn: string;
    speakPesticideType: string;
    speakPesticideQty: string;
    speakPesticideCost: string;
    speakAddPesticideBtn: string;
    speakLaborDays: string;
    speakLaborWages: string;
    speakMachineryHours: string;
    speakMachineryFuel: string;
    speakElectricityCost: string;
    speakIrrigationCost: string;
    speakTransportCost: string;
    speakStorageCost: string;
    speakUpdateCostsBtn: string;
    // Disease Scanner
    speakUploadArea: string;
    speakAnalyzeCropBtn: string;
    // Storage Manager
    speakStorageCrop: string;
    speakHarvestedQty: string;
    speakStorageType: string;
    speakStorageCapacity: string;
    speakSpoilageRate: string;
    speakUpdateStorageBtn: string;
    // Profit Engine
    speakProfitYield: string;
    speakProfitPrice: string;
    // Market Intel
    speakMarketPrice: string;
    speakGetMarketAdviceBtn: string;
    // Notebook
    speakNotebookText: string;
    speakNotebookMicBtn: string;
    speakNotebookAddBtn: string;
    // --- BASE VOICE KEYS ---
    speakFarmSetupIntro: string;
    speakFarmSetupLanguageIntro: string;
    speakFarmSetupLocation: string;
    speakFarmSetupLandSize: string;
    speakDashboardIntro: string;
    speakWeatherIntro: string;
    speakWaterIntro: string;
    speakCostManagerIntro: string;
    speakDiseaseScannerIntro: string;
    speakStorageManagerIntro: string;
    speakProfitEngineIntro: string;
    speakMarketIntelIntro: string;
    speakNotebookIntro: string;
    speakAdvisorIntro: string;
    speakAnalysisComplete: string;
  };
}

export const translations: { [key: string]: Translation } = {
  en: {
    ui: {
      appName: 'Krushi Mitra',
      submit: 'Submit',
      next: 'Next',
      back: 'Back',
      save: 'Save Costs',
      confirm: 'Confirm & Finish',
      navDashboard: 'Command Center',
      navWeatherHub: 'Weather Hub',
      navWaterManage: 'Water Management',
      navCostManager: 'Cost Manager',
      navDiseaseScanner: 'Disease Scanner',
      navStorageManager: 'Storage Manager',
      navProfitEngine: 'Profit Engine',
      navMarketIntel: 'Market Intel',
      navNotebook: 'Notebook',
      navStrategicAdvisor: 'Strategic Advisor',
      headerStatus: 'Status',
      headerStatusText: 'Operational',
      farmSetupTitle: 'Welcome to Krushi Mitra',
      farmSetupSubtitle: "Let's set up your farm profile for precise, AI-powered advice.",
      farmSetupLanguageSelectPrompt: 'Please select or speak your language',
      farmSetupStep1: 'Location',
      farmSetupStep2: 'Farm Basics',
      farmSetupStep3: 'Infrastructure',
      farmSetupStep4: 'Confirmation',
      farmSetupLocationTitle: 'Where is your farm located?',
      farmSetupLocationDesc: 'Precise location helps in providing accurate weather and market data.',
      farmSetupLocationLabel: 'Your Location (District, State)',
      farmSetupLocationPlaceholder: 'e.g., Guntur, Andhra Pradesh',
      farmSetupUseGPS: 'Use My Location',
      farmSetupGeocoding: 'Getting Location...',
      farmSetupBasicsTitle: 'Tell us about your farm.',
      farmSetupBasicsDesc: 'This basic information is crucial for crop and cost analysis.',
      farmSetupLandSizeLabel: 'Total Land Size (in Acres)',
      farmSetupSoilTypeLabel: 'Primary Soil Type',
      farmSetupCropsLabel: 'Main Crops Planted (comma-separated)',
      farmSetupCropsPlaceholder: 'e.g., Rice, Cotton',
      farmSetupInfraTitle: 'What is your farm infrastructure?',
      farmSetupInfraDesc: 'Details about your resources help in generating operational advice.',
      farmSetupSeasonLabel: 'Current Season',
      farmSetupWaterSourceLabel: 'Primary Water Source',
      farmSetupIrrigationLabel: 'Irrigation Method',
      farmSetupMachineryLabel: 'Available Machinery (comma-separated)',
      farmSetupMachineryPlaceholder: 'e.g., Tractor, Sprayer',
      farmSetupConfirmTitle: 'Confirm Your Farm Details',
      farmSetupConfirmDesc: 'Please review all the information before completing the setup.',
      farmSetupConfirmLabelLocation: 'Location',
      farmSetupConfirmLabelLand: 'Land Size',
      farmSetupConfirmLabelSoil: 'Soil Type',
      farmSetupConfirmLabelCrops: 'Crops',
      farmSetupConfirmLabelSeason: 'Season',
      farmSetupConfirmLabelWater: 'Water Source',
      farmSetupConfirmLabelIrrigation: 'Irrigation Method',
      farmSetupConfirmLabelMachinery: 'Machinery',
      farmSetupCompleteButton: 'Complete Farm Setup',
      dashboardTitle: 'Command Center',
      dashboardSubtitle: 'A complete overview of your farm operations, based on your inputs.',
      kpiTotalInvestment: 'Total Investment',
      kpiCostPerAcre: 'Cost / Acre',
      kpiCropCount: 'Crops Planted',
      kpiLandSize: 'Total Land',
      quickAccess: 'Quick Access',
      aiInsightsTitle: 'AI Strategic Insights',
      debtPressureTitle: 'Debt Pressure',
      debtPressureLow: 'Low',
      debtPressureModerate: 'Moderate',
      debtPressureHigh: 'High',
      rainFailureTitle: 'Rain Failure Risk',
      cropSwitchTitle: 'Crop Switch Opportunity',
      viewStrategies: 'View Strategies',
      weatherWidgetTitle: 'Weather Hub',
      waterWidgetTitle: 'Water Management',
      viewDetails: 'View Details',
      costManagerTitle: 'Smart Input & Cost Manager',
      costManagerSubtitle: 'Log all your seasonal expenses here to track your total investment.',
      costCategorySeeds: 'Seeds',
      costCategoryFertilizers: 'Fertilizers',
      costCategoryPesticides: 'Pesticides',
      costCategoryLabor: 'Labor',
      costCategoryMachinery: 'Machinery',
      costCategoryUtilities: 'Utilities',
      costLabelQuantity: 'Quantity (kg)',
      costLabelCost: 'Total Cost (₹)',
      costLabelType: 'Fertilizer/Pesticide Name',
      costLabelDays: 'Total Days',
      costLabelWages: 'Total Wages (₹)',
      costLabelUsageHours: 'Usage (Hours)',
      costLabelFuelCost: 'Fuel Cost (₹)',
      costLabelElectricity: 'Electricity Cost (₹)',
      costLabelIrrigation: 'Irrigation Cost (₹)',
      costLabelTransport: 'Transport Cost (₹)',
      costLabelStorage: 'Storage Cost (₹)',
      costAddFertilizer: 'Add Fertilizer',
      costAddPesticide: 'Add Pesticide',
      costTotalInvestment: 'Total Investment',
      costPerAcre: 'Cost per Acre',
      costUpdateButton: 'Save & Update Costs',
      diseaseScannerTitle: 'AI Disease & Crop Health',
      diseaseScannerSubtitle: 'Upload a photo of a crop leaf for instant diagnosis and treatment advice.',
      diseaseScannerUploadLabel: 'Click to upload or drag and drop a photo',
      diseaseScannerUploadButton: 'Select Photo',
      diseaseScannerAnalyzing: 'AI is analyzing your crop... Please wait.',
      diseaseScannerError: 'Sorry, the AI could not analyze the image. Please try another photo.',
      diseaseScannerResultTitle: 'AI Diagnosis Report',
      diseaseScannerResultConfidence: 'Confidence',
      diseaseScannerResultSeverity: 'Severity',
      diseaseScannerResultExplanation: 'Simple Explanation',
      diseaseScannerResultTreatment: 'Treatment Steps',
      diseaseScannerResultCost: 'Estimated Cost (₹)',
      diseaseScannerResultPrevention: 'Preventive Measures',
      storageManagerTitle: 'Storage & Capacity Manager',
      storageManagerSubtitle: 'Track your harvested crops, storage capacity, and potential spoilage.',
      storageManagerInputs: 'Storage Details',
      storageCropLabel: 'Crop to Store',
      storageHarvestedQtyLabel: 'Harvested Quantity (Quintals)',
      storageHarvestedQtyPlaceholder: 'e.g., 500',
      storageTypeLabel: 'Storage Type',
      storageCapacityLabel: 'Total Capacity (Quintals)',
      storageCapacityPlaceholder: 'e.g., 1000',
      storageSpoilageRateLabel: 'Spoilage Rate (% per week)',
      storageUpdateButton: 'Save Storage Details',
      storageDashboard: 'Capacity Dashboard',
      storageRemainingCapacity: 'Remaining Capacity',
      storageSpoilageForecast: 'Spoilage Forecast',
      storageWeek: 'Week',
      storageProjectedLoss: 'Projected Loss',
      profitEngineTitle: 'Yield & Profit Engine',
      profitEngineSubtitle: 'Estimate your profit based on your costs and expected market prices.',
      profitEngineInputs: 'Your Estimates',
      profitEngineYieldLabel: 'Expected Yield (Quintals per Acre)',
      profitEngineYieldPlaceholder: 'e.g., 25',
      profitEnginePriceLabel: 'Expected Market Price (₹ per Quintal)',
      profitEnginePricePlaceholder: 'e.g., 2000',
      profitEngineAnalysis: 'Profit Analysis',
      profitEngineTotalRevenue: 'Estimated Revenue',
      profitEngineNetProfit: 'Estimated Net Profit',
      profitEngineBreakEven: 'Break-Even Yield (Quintals/Acre)',
      profitEngineChartTitle: 'Cost vs. Revenue',
      marketIntelTitle: 'Market & Selling Intelligence',
      marketIntelSubtitle: 'Get AI-powered advice on when to sell your crops for maximum profit.',
      marketIntelLocalPriceLabel: 'Your Current Local Mandi Price (₹ per Quintal)',
      marketIntelLocalPricePlaceholder: 'e.g., 1950',
      marketIntelGetAnalysis: 'Get Selling Advice',
      marketIntelAnalyzing: 'Analyzing market data...',
      marketIntelError: 'Could not fetch market analysis. Please try again.',
      marketIntelAnalysisTitle: 'AI Selling Recommendation',
      marketIntelPriceTrend: 'Recent Price Trend',
      marketIntelSellVsStore: 'Sell Now vs. Store Analysis',
      marketIntelDecision: 'Decision',
      marketIntelSellNow: 'Sell Now',
      marketIntelStoreFor: 'Store for',
      marketIntelWeeks: 'Weeks',
      marketIntelRecommendation: 'AI Recommendation',
      notebookTitle: 'Farm Notebook',
      notebookSubtitle: 'Keep a record of your thoughts, decisions, and observations for the season.',
      notebookAddNotePlaceholder: 'Type or click the microphone to add a note...',
      notebookAddNoteButton: 'Add Note',
      notebookListening: 'Listening...',
      advisorTitle: 'AI Strategic Advisor',
      advisorSubtitle: 'Advanced AI simulations to guide your most critical farming decisions.',
      advisorRainFailureTitle: 'Rain Failure Decision Engine',
      advisorRainFailureDesc: 'AI has analyzed your farm setup and provides the following strategies to mitigate risk from poor rainfall.',
      advisorCropSwitchTitle: 'Crop Switch Simulator',
      advisorCropSwitchDesc: 'The AI suggests these alternative crops based on your soil, season, and market conditions. Click to simulate the financial impact.',
      advisorCurrentPlan: 'Current Plan',
      advisorSimulatedPlan: 'Simulated Plan',
      advisorEstProfit: 'Est. Profit',
      advisorWaterReq: 'Water Req.',
      advisorRiskLevel: 'Risk Level',
      advisorSimulateBtn: 'Simulate',
      weatherTitle: 'Weather Hub',
      weatherSubtitle: "Hyper-local weather forecasts and AI-powered advisories for your farm.",
      weatherCurrent: 'Current Conditions',
      weatherForecast: '7-Day Forecast',
      weatherAdvisory: 'AI Weather Advisory',
      weatherFeelsLike: 'Feels Like',
      weatherHumidity: 'Humidity',
      weatherWind: 'Wind',
      waterTitle: 'Water Management',
      waterSubtitle: 'Optimize your irrigation schedule and track water usage.',
      waterWeeklyUsage: 'Est. Weekly Usage',
      waterNextIrrigation: 'Next Recommended Irrigation',
      waterLogEvent: 'Log Irrigation Event',
      waterLogDate: 'Date',
      waterLogDuration: 'Duration',
      waterLogDurationUnit: 'hours',
      waterLogButton: 'Log Event',
      waterHistory: 'Irrigation History',
      waterAITip: 'AI Irrigation Tip',
      micPermissionDenied: "Microphone access denied. Please enable it in your browser settings to use voice commands.",
      gpsPermissionDenied: "Location access denied. Please enable it in your browser settings to use this feature.",
      speakFarmSetupIntro: 'Welcome to Krushi Mitra. First, let’s set up your farm profile to get started.',
      speakFarmSetupLanguageIntro: 'Welcome to Krushi Mitra. Please select or speak your preferred language to continue.',
      speakFarmSetupLocation: 'Please enter your location, like your district and state, or use your GPS.',
      speakFarmSetupLandSize: 'Now, tell me the total size of your farm in acres.',
      speakDashboardIntro: 'This is your Command Center. It shows a summary of your farm based on the data you provide.',
      speakWeatherIntro: "This is the Weather Hub. Here you'll find detailed forecasts and AI advice for your location.",
      speakWaterIntro: "This is the Water Management module. Track and optimize your farm's water usage here.",
      speakCostManagerIntro: 'Use this screen to enter all your costs for the season. This is important for accurate profit calculation.',
      speakDiseaseScannerIntro: 'Please upload a clear photo of the affected crop leaf for analysis.',
      speakStorageManagerIntro: 'Enter your harvest and storage details to manage your inventory.',
      speakProfitEngineIntro: 'Enter your expected yield and market price to calculate your potential profit.',
      speakMarketIntelIntro: 'Enter your local mandi price to get an AI-powered selling recommendation.',
      speakNotebookIntro: 'Here you can save notes about your farm. Click the microphone to record with your voice.',
      speakAdvisorIntro: 'This is the Strategic Advisor. It provides AI-powered insights for critical decisions like crop switching and risk management.',
      speakAnalysisComplete: 'The analysis is complete. Here is the report.',
      speakSoilType: "Select the primary soil type of your farm.",
      speakCrops: "Enter the main crops you are planting, separated by commas.",
      speakSeason: "Choose the current agricultural season.",
      speakWaterSource: "Select your main source of water for irrigation.",
      speakIrrigation: "Choose your primary method of irrigation.",
      speakMachinery: "List the main machinery you have available, like a tractor or harvester.",
      speakCompleteSetupBtn: "Click here to finish setting up your farm profile.",
      speakSeedsQty: "Enter the total quantity of seeds you purchased, in kilograms.",
      speakSeedsCost: "Enter the total cost for all the seeds.",
      speakFertilizerType: "Enter the name of the fertilizer, like Urea or DAP.",
      speakFertilizerQty: "Enter the quantity of this fertilizer in kilograms.",
      speakFertilizerCost: "Enter the total cost for this fertilizer.",
      speakAddFertilizerBtn: "Click to add another fertilizer to the list.",
      speakPesticideType: "Enter the name of the pesticide or fungicide.",
      speakPesticideQty: "Enter the quantity of this pesticide in liters or kilograms.",
      speakPesticideCost: "Enter the total cost for this pesticide.",
      speakAddPesticideBtn: "Click to add another pesticide to the list.",
      speakLaborDays: "Enter the total number of days labor was hired.",
      speakLaborWages: "Enter the total amount paid in wages to all laborers.",
      speakMachineryHours: "Enter the total hours machinery like tractors were used.",
      speakMachineryFuel: "Enter the total cost of fuel for all machinery.",
      speakElectricityCost: "Enter your total electricity bill for the season.",
      speakIrrigationCost: "Enter any extra costs for irrigation or water.",
      speakTransportCost: "Enter the total cost for transporting your goods.",
      speakStorageCost: "Enter the total cost for storing your harvest.",
      speakUpdateCostsBtn: "Click here to save all your expenses and update the calculations.",
      speakUploadArea: "Click here to select a photo of the affected crop leaf from your device.",
      speakAnalyzeCropBtn: "After selecting a photo, click here to start the AI analysis.",
      speakStorageCrop: "Select the crop you have harvested and are storing.",
      speakHarvestedQty: "Enter the total quantity you have harvested, in quintals.",
      speakStorageType: "Choose the type of facility where you are storing your crop.",
      speakStorageCapacity: "Enter the total storage capacity you have, in quintals.",
      speakSpoilageRate: "Enter the estimated percentage of crop that might spoil each week.",
      speakUpdateStorageBtn: "Click to save your storage information.",
      speakProfitYield: "Enter the yield you expect to get from each acre, in quintals.",
      speakProfitPrice: "Enter the market price you expect to get for each quintal of your crop.",
      speakMarketPrice: "Enter the current selling price at your nearest local market or mandi.",
      speakGetMarketAdviceBtn: "Click here to get AI-powered advice on whether to sell now or store your crop.",
      speakNotebookText: "You can type your notes here.",
      speakNotebookMicBtn: "Click this button to start or stop recording a note with your voice.",
      speakNotebookAddBtn: "Click to save this note to your notebook.",
    },
  },
  te: {
    ui: {
      appName: 'కృషి మిత్ర',
      submit: 'సమర్పించు',
      next: 'తరువాత',
      back: 'వెనుకకు',
      save: 'ఖర్చులను సేవ్ చేయండి',
      confirm: 'నిర్ధారించి పూర్తి చేయండి',
      navDashboard: 'కమాండ్ సెంటర్',
      navWeatherHub: 'వాతావరణ కేంద్రం',
      navWaterManage: 'నీటి యాజమాన్యం',
      navCostManager: 'ఖర్చుల నిర్వాహకం',
      navDiseaseScanner: 'వ్యాధి స్కానర్',
      navStorageManager: 'నిల్వ నిర్వాహకం',
      navProfitEngine: 'లాభాల ఇంజిన్',
      navMarketIntel: 'మార్కెట్ ఇంటెల్',
      navNotebook: 'నోట్బుక్',
      navStrategicAdvisor: 'వ్యూహాత్మక సలహాదారు',
      headerStatus: 'స్థితి',
      headerStatusText: 'కార్యకలాపంలో ఉంది',
      farmSetupTitle: 'కృషి మిత్రకు స్వాగతం',
      farmSetupSubtitle: 'AI-ఆధారిత సలహా కోసం మీ వ్యవసాయ ప్రొఫైల్‌ను సెటప్ చేద్దాం.',
      farmSetupLanguageSelectPrompt: 'దయచేసి మీ భాషను ఎంచుకోండి లేదా మాట్లాడండి',
      farmSetupStep1: 'ప్రాంతం',
      farmSetupStep2: 'పొలం బేసిక్స్',
      farmSetupStep3: 'మౌలిక సదుపాయాలు',
      farmSetupStep4: 'నిర్ధారణ',
      farmSetupLocationTitle: 'మీ పొలం ఎక్కడ ఉంది?',
      farmSetupLocationDesc: 'ఖచ్చితమైన వాతావరణ మరియు మార్కెట్ డేటా కోసం ఇది సహాయపడుతుంది.',
      farmSetupLocationLabel: 'మీ ప్రాంతం (జిల్లా, రాష్ట్రం)',
      farmSetupLocationPlaceholder: 'ఉదా., గుంటూరు, ఆంధ్రప్రదేశ్',
      farmSetupUseGPS: 'నా ప్రాంతాన్ని ఉపయోగించు',
      farmSetupGeocoding: 'స్థానాన్ని పొందుతోంది...',
      farmSetupBasicsTitle: 'మీ పొలం గురించి చెప్పండి.',
      farmSetupBasicsDesc: 'ఈ ప్రాథమిక సమాచారం పంట మరియు ఖర్చుల విశ్లేషణకు ముఖ్యం.',
      farmSetupLandSizeLabel: 'మొత్తం భూమి (ఎకరాలలో)',
      farmSetupSoilTypeLabel: 'ప్రధాన నేల రకం',
      farmSetupCropsLabel: 'ప్రధాన పంటలు (కామాతో వేరుచేయండి)',
      farmSetupCropsPlaceholder: 'ఉదా., వరి, పత్తి',
      farmSetupInfraTitle: 'మీ పొలం మౌలిక సదుపాయాలు ఏమిటి?',
      farmSetupInfraDesc: 'మీ వనరుల వివరాలు కార్యాచరణ సలహాలను రూపొందించడంలో సహాయపడతాయి.',
      farmSetupSeasonLabel: 'ప్రస్తుత కాలం',
      farmSetupWaterSourceLabel: 'ప్రధాన నీటి వనరు',
      farmSetupIrrigationLabel: 'నీటిపారుదల పద్ధతి',
      farmSetupMachineryLabel: 'అందుబాటులో ఉన్న యంత్రాలు (కామాతో వేరుచేయండి)',
      farmSetupMachineryPlaceholder: 'ఉదా., ట్రాక్టర్, స్ప్రేయర్',
      farmSetupConfirmTitle: 'మీ పొలం వివరాలను నిర్ధారించండి',
      farmSetupConfirmDesc: 'సెటప్ పూర్తి చేసే ముందు దయచేసి మొత్తం సమాచారాన్ని సమీక్షించండి.',
      farmSetupConfirmLabelLocation: 'ప్రాంతం',
      farmSetupConfirmLabelLand: 'భూమి',
      farmSetupConfirmLabelSoil: 'నేల రకం',
      farmSetupConfirmLabelCrops: 'పంటలు',
      farmSetupConfirmLabelSeason: 'కాలం',
      farmSetupConfirmLabelWater: 'నీటి వనరు',
      farmSetupConfirmLabelIrrigation: 'నీటిపారుదల',
      farmSetupConfirmLabelMachinery: 'యంత్రాలు',
      farmSetupCompleteButton: 'పొలం సెటప్ పూర్తి చేయండి',
      dashboardTitle: 'కమాండ్ సెంటర్',
      dashboardSubtitle: 'మీ ఇన్‌పుట్‌ల ఆధారంగా మీ వ్యవసాయ కార్యకలాపాల పూర్తి అవలోకనం.',
      kpiTotalInvestment: 'మొత్తం పెట్టుబడి',
      kpiCostPerAcre: 'ఖర్చు / ఎకరం',
      kpiCropCount: 'నాటిన పంటలు',
      kpiLandSize: 'మొత్తం భూమి',
      quickAccess: 'త్వరిత యాక్సెస్',
      aiInsightsTitle: 'AI వ్యూహాత్మక అంతర్దృష్టులు',
      debtPressureTitle: 'అప్పుల ఒత్తిడి',
      debtPressureLow: 'తక్కువ',
      debtPressureModerate: 'మధ్యస్థం',
      debtPressureHigh: 'అధికం',
      rainFailureTitle: 'వర్షాభావ ప్రమాదం',
      cropSwitchTitle: 'పంట మార్పిడి అవకాశం',
      viewStrategies: 'వ్యూహాలను వీక్షించండి',
      weatherWidgetTitle: 'వాతావరణ కేంద్రం',
      waterWidgetTitle: 'నీటి యాజమాన్యం',
      viewDetails: 'వివరాలు చూడండి',
      costManagerTitle: 'స్మార్ట్ ఇన్‌పుట్ & ఖర్చుల నిర్వాహకం',
      costManagerSubtitle: 'మీ మొత్తం పెట్టుబడిని ట్రాక్ చేయడానికి మీ కాలానుగుణ ఖర్చులను ఇక్కడ లాగ్ చేయండి.',
      costCategorySeeds: 'విత్తనాలు',
      costCategoryFertilizers: 'ఎరువులు',
      costCategoryPesticides: 'పురుగుమందులు',
      costCategoryLabor: 'కూలీ',
      costCategoryMachinery: 'యంత్రాలు',
      costCategoryUtilities: 'యుటిలిటీలు',
      costLabelQuantity: 'పరిమాణం (కిలోలు)',
      costLabelCost: 'మొత్తం ఖర్చు (₹)',
      costLabelType: 'ఎరువు/పురుగుమందు పేరు',
      costLabelDays: 'మొత్తం రోజులు',
      costLabelWages: 'మొత్తం వేతనాలు (₹)',
      costLabelUsageHours: 'వాడుక (గంటలు)',
      costLabelFuelCost: 'ఇంధన ఖర్చు (₹)',
      costLabelElectricity: 'విద్యుత్ ఖర్చు (₹)',
      costLabelIrrigation: 'నీటిపారుదల ఖర్చు (₹)',
      costLabelTransport: 'రవాణా ఖర్చు (₹)',
      costLabelStorage: 'నిల్వ ఖర్చు (₹)',
      costAddFertilizer: 'ఎరువును జోడించు',
      costAddPesticide: 'పురుగుమందును జోడించు',
      costTotalInvestment: 'మొత్తం పెట్టుబడి',
      costPerAcre: 'ఎకరాకు ఖర్చు',
      costUpdateButton: 'ఖర్చులను సేవ్ & అప్‌డేట్ చేయండి',
      diseaseScannerTitle: 'AI వ్యాధి & పంట ఆరోగ్యం',
      diseaseScannerSubtitle: 'తక్షణ నిర్ధారణ మరియు చికిత్స సలహా కోసం పంట ఆకు ఫోటోను అప్‌లోడ్ చేయండి.',
      diseaseScannerUploadLabel: 'ఫోటోను అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా డ్రాగ్ చేసి డ్రాప్ చేయండి',
      diseaseScannerUploadButton: 'ఫోటోను ఎంచుకోండి',
      diseaseScannerAnalyzing: 'AI మీ పంటను విశ్లేషిస్తోంది... దయచేసి వేచి ఉండండి.',
      diseaseScannerError: 'క్షమించండి, AI చిత్రాన్ని విశ్లేషించలేకపోయింది. దయచేసి మరో ఫోటోను ప్రయత్నించండి.',
      diseaseScannerResultTitle: 'AI నిర్ధారణ నివేదిక',
      diseaseScannerResultConfidence: 'విశ్వాసం',
      diseaseScannerResultSeverity: 'తీవ్రత',
      diseaseScannerResultExplanation: 'సాధారణ వివరణ',
      diseaseScannerResultTreatment: 'చికిత్స దశలు',
      diseaseScannerResultCost: 'అంచనా ఖర్చు (₹)',
      diseaseScannerResultPrevention: 'నివారణ చర్యలు',
      storageManagerTitle: 'నిల్వ & సామర్థ్య నిర్వాహకం',
      storageManagerSubtitle: 'మీ కోసిన పంటలు, నిల్వ సామర్థ్యం మరియు సంభావ్య నష్టాన్ని ట్రాక్ చేయండి.',
      storageManagerInputs: 'నిల్వ వివరాలు',
      storageCropLabel: 'నిల్వ చేయాల్సిన పంట',
      storageHarvestedQtyLabel: 'కోసిన పరిమాణం (క్వింటాళ్లు)',
      storageHarvestedQtyPlaceholder: 'ఉదా., 500',
      storageTypeLabel: 'నిల్వ రకం',
      storageCapacityLabel: 'మొత్తం సామర్థ్యం (క్వింటాళ్లు)',
      storageCapacityPlaceholder: 'ఉదా., 1000',
      storageSpoilageRateLabel: 'నష్టం రేటు (% ప్రతి వారం)',
      storageUpdateButton: 'నిల్వ వివరాలను సేవ్ చేయండి',
      storageDashboard: 'సామర్థ్య డ్యాష్‌బోర్డ్',
      storageRemainingCapacity: 'మిగిలిన సామర్థ్యం',
      storageSpoilageForecast: 'నష్టం అంచనా',
      storageWeek: 'వారం',
      storageProjectedLoss: 'అంచనా నష్టం',
      profitEngineTitle: 'దిగుబడి & లాభాల ఇంజిన్',
      profitEngineSubtitle: 'మీ ఖర్చులు మరియు అంచనా మార్కెట్ ధరల ఆధారంగా మీ లాభాన్ని అంచనా వేయండి.',
      profitEngineInputs: 'మీ అంచనాలు',
      profitEngineYieldLabel: 'అంచనా దిగుబడి (క్వింటాళ్లు/ఎకరం)',
      profitEngineYieldPlaceholder: 'ఉదా., 25',
      profitEnginePriceLabel: 'అంచనా మార్కెట్ ధర (₹/క్వింటాల్)',
      profitEnginePricePlaceholder: 'ఉదా., 2000',
      profitEngineAnalysis: 'లాభాల విశ్లేషణ',
      profitEngineTotalRevenue: 'అంచనా ఆదాయం',
      profitEngineNetProfit: 'అంచనా నికర లాభం',
      profitEngineBreakEven: 'బ్రేక్-ఈవెన్ దిగుబడి (క్వింటాళ్లు/ఎకరం)',
      profitEngineChartTitle: 'ఖర్చు vs. ఆదాయం',
      marketIntelTitle: 'మార్కెట్ & అమ్మకాల ఇంటెలిజెన్స్',
      marketIntelSubtitle: 'గరిష్ట లాభం కోసం మీ పంటలను ఎప్పుడు అమ్మాలో AI-ఆధారిత సలహా పొందండి.',
      marketIntelLocalPriceLabel: 'మీ ప్రస్తుత స్థానిక మండీ ధర (₹/క్వింటాల్)',
      marketIntelLocalPricePlaceholder: 'ఉదా., 1950',
      marketIntelGetAnalysis: 'అమ్మకాల సలహా పొందండి',
      marketIntelAnalyzing: 'మార్కెట్ డేటాను విశ్లేషిస్తోంది...',
      marketIntelError: 'మార్కెట్ విశ్లేషణను పొందలేకపోయాము. దయచేసి మళ్ళీ ప్రయత్నించండి.',
      marketIntelAnalysisTitle: 'AI అమ్మకాల సిఫార్సు',
      marketIntelPriceTrend: 'ఇటీవలి ధరల ధోరణి',
      marketIntelSellVsStore: 'ఇప్పుడు అమ్మండి vs. నిల్వ విశ్లేషణ',
      marketIntelDecision: 'నిర్ణయం',
      marketIntelSellNow: 'ఇప్పుడు అమ్మండి',
      marketIntelStoreFor: 'నిల్వ చేయండి',
      marketIntelWeeks: 'వారాలు',
      marketIntelRecommendation: 'AI సిఫార్సు',
      notebookTitle: 'పొలం నోట్బుక్',
      notebookSubtitle: 'ఈ కాలానికి మీ ఆలోచనలు, నిర్ణయాలు మరియు పరిశీలనల రికార్డును ఉంచుకోండి.',
      notebookAddNotePlaceholder: 'ఒక గమనికను జోడించడానికి టైప్ చేయండి లేదా మైక్రోఫోన్‌ను క్లిక్ చేయండి...',
      notebookAddNoteButton: 'గమనికను జోడించు',
      notebookListening: 'వినడం జరుగుతోంది...',
      advisorTitle: 'AI వ్యూహాత్మక సలహాదారు',
      advisorSubtitle: 'మీ అత్యంత క్లిష్టమైన వ్యవసాయ నిర్ణయాలకు మార్గనిర్దేశం చేయడానికి అధునాతన AI అనుకరణలు.',
      advisorRainFailureTitle: 'వర్షాభావ నిర్ణయ ఇంజిన్',
      advisorRainFailureDesc: 'AI మీ పొలం సెటప్‌ను విశ్లేషించింది మరియు తక్కువ వర్షపాతం నుండి ప్రమాదాన్ని తగ్గించడానికి క్రింది వ్యూహాలను అందిస్తుంది.',
      advisorCropSwitchTitle: 'పంట మార్పిడి సిమ్యులేటర్',
      advisorCropSwitchDesc: 'AI మీ నేల, కాలం మరియు మార్కెట్ పరిస్థితుల ఆధారంగా ఈ ప్రత్యామ్నాయ పంటలను సూచిస్తుంది. ఆర్థిక ప్రభావాన్ని అనుకరించడానికి క్లిక్ చేయండి.',
      advisorCurrentPlan: 'ప్రస్తుత ప్రణాళిక',
      advisorSimulatedPlan: 'అనుకరణ ప్రణాళిక',
      advisorEstProfit: 'అంచనా లాభం',
      advisorWaterReq: 'నీటి అవసరం',
      advisorRiskLevel: 'ప్రమాద స్థాయి',
      advisorSimulateBtn: 'అనుకరించు',
      weatherTitle: 'వాతావరణ కేంద్రం',
      weatherSubtitle: "మీ పొలం కోసం హైపర్-లోకల్ వాతావరణ అంచనాలు మరియు AI-ఆధారిత సలహాలు.",
      weatherCurrent: 'ప్రస్తుత పరిస్థితులు',
      weatherForecast: '7-రోజుల అంచనా',
      weatherAdvisory: 'AI వాతావరణ సలహా',
      weatherFeelsLike: 'అనిపిస్తుంది',
      weatherHumidity: 'తేమ',
      weatherWind: 'గాలి',
      waterTitle: 'నీటి యాజమాన్యం',
      waterSubtitle: 'మీ నీటిపారుదల షెడ్యూల్‌ను ఆప్టిమైజ్ చేయండి మరియు నీటి వాడకాన్ని ట్రాక్ చేయండి.',
      waterWeeklyUsage: 'అంచనా వారపు వాడకం',
      waterNextIrrigation: 'తదుపరి సిఫార్సు చేయబడిన నీటిపారుదల',
      waterLogEvent: 'నీటిపారుదల ఈవెంట్‌ను లాగ్ చేయండి',
      waterLogDate: 'తేదీ',
      waterLogDuration: 'వ్యవధి',
      waterLogDurationUnit: 'గంటలు',
      waterLogButton: 'ఈవెంట్‌ను లాగ్ చేయండి',
      waterHistory: 'నీటిపారుదల చరిత్ర',
      waterAITip: 'AI నీటిపారుదల చిట్కా',
      micPermissionDenied: "మైక్రోఫోన్ యాక్సెస్ నిరాకరించబడింది. వాయిస్ కమాండ్‌లను ఉపయోగించడానికి దయచేసి మీ బ్రౌజర్ సెట్టింగ్‌లలో దీన్ని ప్రారంభించండి.",
      gpsPermissionDenied: "స్థాన యాక్సెస్ నిరాకరించబడింది. ఈ ఫీచర్‌ను ఉపయోగించడానికి దయచేసి మీ బ్రౌజర్ సెట్టింగ్‌లలో దీన్ని ప్రారంభించండి.",
      speakFarmSetupIntro: 'కృషి మిత్రకు స్వాగతం. మొదట, ప్రారంభించడానికి మీ వ్యవసాయ ప్రొఫైల్‌ను సెటప్ చేద్దాం.',
      speakFarmSetupLanguageIntro: 'కృషి మిత్రకు స్వాగతం. కొనసాగించడానికి దయచేసి మీకు ఇష్టమైన భాషను ఎంచుకోండి లేదా మాట్లాడండి.',
      speakFarmSetupLocation: 'దయచేసి మీ జిల్లా మరియు రాష్ట్రం వంటి మీ స్థానాన్ని నమోదు చేయండి లేదా మీ GPSని ఉపయోగించండి.',
      speakFarmSetupLandSize: 'ఇప్పుడు, మీ పొలం మొత్తం పరిమాణాన్ని ఎకరాలలో చెప్పండి.',
      speakDashboardIntro: 'ఇది మీ కమాండ్ సెంటర్. మీరు అందించిన డేటా ఆధారంగా ఇది మీ పొలం యొక్క సారాంశాన్ని చూపుతుంది.',
      speakWeatherIntro: "ఇది వాతావరణ కేంద్రం. ఇక్కడ మీరు మీ స్థానం కోసం వివరణాత్మక అంచనాలు మరియు AI సలహాలను కనుగొంటారు.",
      speakWaterIntro: "ఇది నీటి నిర్వహణ మాడ్యూల్. ఇక్కడ మీ పొలం యొక్క నీటి వినియోగాన్ని ట్రాక్ చేయండి మరియు ఆప్టిమైజ్ చేయండి.",
      speakCostManagerIntro: 'ఈ కాలానికి మీ అన్ని ఖర్చులను నమోదు చేయడానికి ఈ స్క్రీన్‌ను ఉపయోగించండి. ఖచ్చితమైన లాభాల లెక్కింపు కోసం ఇది ముఖ్యం.',
      speakDiseaseScannerIntro: 'దయచేసి విశ్లేషణ కోసం ప్రభావిత పంట ఆకు యొక్క స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి.',
      speakStorageManagerIntro: 'మీ ఇన్వెంటరీని నిర్వహించడానికి మీ పంట మరియు నిల్వ వివరాలను నమోదు చేయండి.',
      speakProfitEngineIntro: 'మీ సంభావ్య లాభాన్ని లెక్కించడానికి మీ అంచనా దిగుబడి మరియు మార్కెట్ ధరను నమోదు చేయండి.',
      speakMarketIntelIntro: 'AI-ఆధారిత అమ్మకపు సిఫార్సును పొందడానికి మీ స్థానిక మండీ ధరను నమోదు చేయండి.',
      speakNotebookIntro: 'ఇక్కడ మీరు మీ పొలం గురించి గమనికలను సేవ్ చేయవచ్చు. మీ స్వరంతో రికార్డ్ చేయడానికి మైక్రోఫోన్‌ను క్లిక్ చేయండి.',
      speakAdvisorIntro: 'ఇది వ్యూహాత్మక సలహాదారు. ఇది పంట మార్పిడి మరియు నష్ట నిర్వహణ వంటి క్లిష్టమైన నిర్ణయాల కోసం AI-ఆధారిత అంతర్దృష్టులను అందిస్తుంది.',
      speakAnalysisComplete: 'విశ్లేషణ పూర్తయింది. ఇక్కడ నివేదిక ఉంది.',
      speakSoilType: "మీ పొలం యొక్క ప్రాథమిక నేల రకాన్ని ఎంచుకోండి.",
      speakCrops: "మీరు నాటుతున్న ప్రధాన పంటలను కామాలతో వేరు చేసి నమోదు చేయండి.",
      speakSeason: "ప్రస్తుత వ్యవసాయ కాలాన్ని ఎంచుకోండి.",
      speakWaterSource: "నీటిపారుదల కోసం మీ ప్రధాన నీటి వనరును ఎంచుకోండి.",
      speakIrrigation: "మీ ప్రాథమిక నీటిపారుదల పద్ధతిని ఎంచుకోండి.",
      speakMachinery: "మీకు అందుబాటులో ఉన్న ప్రధాన యంత్రాలను, ట్రాక్టర్ లేదా హార్వెస్టర్ వంటివి, జాబితా చేయండి.",
      speakCompleteSetupBtn: "మీ పొలం ప్రొఫైల్‌ను సెటప్ చేయడం పూర్తి చేయడానికి ఇక్కడ క్లిక్ చేయండి.",
      speakSeedsQty: "మీరు కొనుగోలు చేసిన విత్తనాల మొత్తం పరిమాణాన్ని కిలోగ్రాములలో నమోదు చేయండి.",
      speakSeedsCost: "అన్ని విత్తనాల కోసం మొత్తం ఖర్చును నమోదు చేయండి.",
      speakFertilizerType: "యూరియా లేదా డిఎపి వంటి ఎరువు పేరును నమోదు చేయండి.",
      speakFertilizerQty: "ఈ ఎరువు యొక్క పరిమాణాన్ని కిలోగ్రాములలో నమోదు చేయండి.",
      speakFertilizerCost: "ఈ ఎరువు కోసం మొత్తం ఖర్చును నమోదు చేయండి.",
      speakAddFertilizerBtn: "జాబితాకు మరొక ఎరువును జోడించడానికి క్లిక్ చేయండి.",
      speakPesticideType: "పురుగుమందు లేదా శిలీంద్ర సంహారిణి పేరును నమోదు చేయండి.",
      speakPesticideQty: "ఈ పురుగుమందు పరిమాణాన్ని లీటర్లు లేదా కిలోగ్రాములలో నమోదు చేయండి.",
      speakPesticideCost: "ఈ పురుగుమందు కోసం మొత్తం ఖర్చును నమోదు చేయండి.",
      speakAddPesticideBtn: "జాబితాకు మరొక పురుగుమందును జోడించడానికి క్లిక్ చేయండి.",
      speakLaborDays: "కూలీలను నియమించుకున్న మొత్తం రోజుల సంఖ్యను నమోదు చేయండి.",
      speakLaborWages: "అన్ని కూలీలకు వేతనాల రూపంలో చెల్లించిన మొత్తం మొత్తాన్ని నమోదు చేయండి.",
      speakMachineryHours: "ట్రాక్టర్ల వంటి యంత్రాలను ఉపయోగించిన మొత్తం గంటలను నమోదు చేయండి.",
      speakMachineryFuel: "అన్ని యంత్రాల కోసం ఇంధనం యొక్క మొత్తం ఖర్చును నమోదు చేయండి.",
      speakElectricityCost: "ఈ కాలానికి మీ మొత్తం విద్యుత్ బిల్లును నమోదు చేయండి.",
      speakIrrigationCost: "నీటిపారుదల లేదా నీటి కోసం ఏదైనా అదనపు ఖర్చులను నమోదు చేయండి.",
      speakTransportCost: "మీ వస్తువులను రవాణా చేయడానికి మొత్తం ఖర్చును నమోదు చేయండి.",
      speakStorageCost: "మీ పంటను నిల్వ చేయడానికి మొత్తం ఖర్చును నమోదు చేయండి.",
      speakUpdateCostsBtn: "మీ అన్ని ఖర్చులను సేవ్ చేయడానికి మరియు లెక్కలను నవీకరించడానికి ఇక్కడ క్లిక్ చేయండి.",
      speakUploadArea: "మీ పరికరం నుండి ప్రభావిత పంట ఆకు యొక్క ఫోటోను ఎంచుకోవడానికి ఇక్కడ క్లిక్ చేయండి.",
      speakAnalyzeCropBtn: "ఫోటోను ఎంచుకున్న తర్వాత, AI విశ్లేషణను ప్రారంభించడానికి ఇక్కడ క్లిక్ చేయండి.",
      speakStorageCrop: "మీరు కోసిన మరియు నిల్వ చేస్తున్న పంటను ఎంచుకోండి.",
      speakHarvestedQty: "మీరు కోసిన మొత్తం పరిమాణాన్ని క్వింటాళ్లలో నమోదు చేయండి.",
      speakStorageType: "మీ పంటను నిల్వ చేస్తున్న సౌకర్యం రకాన్ని ఎంచుకోండి.",
      speakStorageCapacity: "మీకు ఉన్న మొత్తం నిల్వ సామర్థ్యాన్ని క్వింటాళ్లలో నమోదు చేయండి.",
      speakSpoilageRate: "ప్రతి వారం పాడుకాగల పంట యొక్క అంచనా శాతాన్ని నమోదు చేయండి.",
      speakUpdateStorageBtn: "మీ నిల్వ సమాచారాన్ని సేవ్ చేయడానికి క్లిక్ చేయండి.",
      speakProfitYield: "ప్రతి ఎకరం నుండి మీరు ఆశించే దిగుబడిని క్వింటాళ్లలో నమోదు చేయండి.",
      speakProfitPrice: "మీ పంట యొక్క ప్రతి క్వింటాల్‌కు మీరు ఆశించే మార్కెట్ ధరను నమోదు చేయండి.",
      speakMarketPrice: "మీ సమీప స్థానిక మార్కెట్ లేదా మండీలో ప్రస్తుత అమ్మకం ధరను నమోదు చేయండి.",
      speakGetMarketAdviceBtn: "ఇప్పుడు అమ్మాలా లేదా మీ పంటను నిల్వ చేయాలా అనే దానిపై AI-ఆధారిత సలహా పొందడానికి ఇక్కడ క్లిక్ చేయండి.",
      speakNotebookText: "మీరు మీ గమనికలను ఇక్కడ టైప్ చేయవచ్చు.",
      speakNotebookMicBtn: "మీ స్వరంతో గమనికను రికార్డ్ చేయడం ప్రారంభించడానికి లేదా ఆపడానికి ఈ బటన్‌ను క్లిక్ చేయండి.",
      speakNotebookAddBtn: "ఈ గమనికను మీ నోట్‌బుక్‌లో సేవ్ చేయడానికి క్లిక్ చేయండి.",
    },
  },
  hi: {
    ui: {
      appName: 'कृषि मित्र',
      submit: 'सबमिट करें',
      next: 'अगला',
      back: 'वापस',
      save: 'लागत बचाएं',
      confirm: 'पुष्टि करें और समाप्त करें',
      navDashboard: 'कमांड सेंटर',
      navWeatherHub: 'मौसम हब',
      navWaterManage: 'जल प्रबंधन',
      navCostManager: 'लागत प्रबंधक',
      navDiseaseScanner: 'रोग स्कैनर',
      navStorageManager: 'भंडारण प्रबंधक',
      navProfitEngine: 'लाभ इंजन',
      navMarketIntel: 'बाजार इंटेल',
      navNotebook: 'नोटबुक',
      navStrategicAdvisor: 'रणनीतिक सलाहकार',
      headerStatus: 'स्थिति',
      headerStatusText: 'चालू है',
      farmSetupTitle: 'कृषि मित्र में आपका स्वागत है',
      farmSetupSubtitle: 'आइए सटीक, एआई-संचालित सलाह के लिए आपकी कृषि प्रोफ़ाइल सेट करें।',
      farmSetupLanguageSelectPrompt: 'कृपया अपनी भाषा चुनें या बोलें',
      farmSetupStep1: 'स्थान',
      farmSetupStep2: 'खेत की मूल बातें',
      farmSetupStep3: 'बुनियादी ढाँचा',
      farmSetupStep4: 'पुष्टिकरण',
      farmSetupLocationTitle: 'आपका खेत कहाँ स्थित है?',
      farmSetupLocationDesc: 'सटीक स्थान सटीक मौसम और बाजार डेटा प्रदान करने में मदद करता है।',
      farmSetupLocationLabel: 'आपका स्थान (जिला, राज्य)',
      farmSetupLocationPlaceholder: 'जैसे, गुंटूर, आंध्र प्रदेश',
      farmSetupUseGPS: 'मेरे स्थान का उपयोग करें',
      farmSetupGeocoding: 'स्थान प्राप्त हो रहा है...',
      farmSetupBasicsTitle: 'हमें अपने खेत के बारे में बताएं।',
      farmSetupBasicsDesc: 'यह बुनियादी जानकारी फसल और लागत विश्लेषण के लिए महत्वपूर्ण है।',
      farmSetupLandSizeLabel: 'कुल भूमि का आकार (एकड़ में)',
      farmSetupSoilTypeLabel: 'प्राथमिक मिट्टी का प्रकार',
      farmSetupCropsLabel: 'लगाई गई मुख्य फसलें (अल्पविराम से अलग)',
      farmSetupCropsPlaceholder: 'जैसे, चावल, कपास',
      farmSetupInfraTitle: 'आपके खेत का बुनियादी ढाँचा क्या है?',
      farmSetupInfraDesc: 'आपके संसाधनों के बारे में विवरण परिचालन सलाह देने में मदद करता है।',
      farmSetupSeasonLabel: 'वर्तमान मौसम',
      farmSetupWaterSourceLabel: 'प्राथमिक जल स्रोत',
      farmSetupIrrigationLabel: 'सिंचाई विधि',
      farmSetupMachineryLabel: 'उपलब्ध मशीनरी (अल्पविराम से अलग)',
      farmSetupMachineryPlaceholder: 'जैसे, ट्रैक्टर, स्प्रेयर',
      farmSetupConfirmTitle: 'अपने खेत के विवरण की पुष्टि करें',
      farmSetupConfirmDesc: 'सेटअप पूरा करने से पहले कृपया सभी जानकारी की समीक्षा करें।',
      farmSetupConfirmLabelLocation: 'स्थान',
      farmSetupConfirmLabelLand: 'भूमि का आकार',
      farmSetupConfirmLabelSoil: 'मिट्टी का प्रकार',
      farmSetupConfirmLabelCrops: 'फसलें',
      farmSetupConfirmLabelSeason: 'मौसम',
      farmSetupConfirmLabelWater: 'जल स्रोत',
      farmSetupConfirmLabelIrrigation: 'सिंचाई',
      farmSetupConfirmLabelMachinery: 'मशीनरी',
      farmSetupCompleteButton: 'फार्म सेटअप पूरा करें',
      dashboardTitle: 'कमांड सेंटर',
      dashboardSubtitle: 'आपके इनपुट के आधार पर आपके कृषि कार्यों का एक पूरा अवलोकन।',
      kpiTotalInvestment: 'कुल निवेश',
      kpiCostPerAcre: 'लागत / एकड़',
      kpiCropCount: 'लगाई गई फसलें',
      kpiLandSize: 'कुल भूमि',
      quickAccess: 'त्वरित पहुँच',
      aiInsightsTitle: 'एआई रणनीतिक अंतर्दृष्टि',
      debtPressureTitle: 'कर्ज का दबाव',
      debtPressureLow: 'कम',
      debtPressureModerate: 'मध्यम',
      debtPressureHigh: 'उच्च',
      rainFailureTitle: 'बारिश की विफलता का खतरा',
      cropSwitchTitle: 'फसल बदलने का अवसर',
      viewStrategies: 'रणनीतियाँ देखें',
      weatherWidgetTitle: 'मौसम हब',
      waterWidgetTitle: 'जल प्रबंधन',
      viewDetails: 'विवरण देखें',
      costManagerTitle: 'स्मार्ट इनपुट और लागत प्रबंधक',
      costManagerSubtitle: 'अपने कुल निवेश को ट्रैक करने के लिए अपने सभी मौसमी खर्चों को यहाँ लॉग करें।',
      costCategorySeeds: 'बीज',
      costCategoryFertilizers: 'उर्वरक',
      costCategoryPesticides: 'कीटनाशक',
      costCategoryLabor: 'श्रम',
      costCategoryMachinery: 'मशीनरी',
      costCategoryUtilities: 'उपयोगिताएँ',
      costLabelQuantity: 'मात्रा (किलो)',
      costLabelCost: 'कुल लागत (₹)',
      costLabelType: 'उर्वरक/कीटनाशक का नाम',
      costLabelDays: 'कुल दिन',
      costLabelWages: 'कुल मजदूरी (₹)',
      costLabelUsageHours: 'उपयोग (घंटे)',
      costLabelFuelCost: 'ईंधन लागत (₹)',
      costLabelElectricity: 'बिजली लागत (₹)',
      costLabelIrrigation: 'सिंचाई लागत (₹)',
      costLabelTransport: 'परिवहन लागत (₹)',
      costLabelStorage: 'भंडारण लागत (₹)',
      costAddFertilizer: 'उर्वरक जोड़ें',
      costAddPesticide: 'कीटनाशक जोड़ें',
      costTotalInvestment: 'कुल निवेश',
      costPerAcre: 'लागत प्रति एकड़',
      costUpdateButton: 'लागत सहेजें और अपडेट करें',
      diseaseScannerTitle: 'एआई रोग और फसल स्वास्थ्य',
      diseaseScannerSubtitle: 'तत्काल निदान और उपचार सलाह के लिए फसल के पत्ते की एक तस्वीर अपलोड करें।',
      diseaseScannerUploadLabel: 'अपलोड करने के लिए क्लिक करें या एक तस्वीर खींचें और छोड़ें',
      diseaseScannerUploadButton: 'फोटो चुनें',
      diseaseScannerAnalyzing: 'एआई आपकी फसल का विश्लेषण कर रहा है... कृपया प्रतीक्षा करें।',
      diseaseScannerError: 'क्षमा करें, एआई छवि का विश्लेषण नहीं कर सका। कृपया कोई दूसरी तस्वीर आज़माएँ।',
      diseaseScannerResultTitle: 'एआई निदान रिपोर्ट',
      diseaseScannerResultConfidence: 'आत्मविश्वास',
      diseaseScannerResultSeverity: 'गंभीरता',
      diseaseScannerResultExplanation: 'सरल स्पष्टीकरण',
      diseaseScannerResultTreatment: 'उपचार के चरण',
      diseaseScannerResultCost: 'अनुमानित लागत (₹)',
      diseaseScannerResultPrevention: 'निवारक उपाय',
      storageManagerTitle: 'भंडारण और क्षमता प्रबंधक',
      storageManagerSubtitle: 'अपनी काटी हुई फसलों, भंडारण क्षमता और संभावित खराबी को ट्रैक करें।',
      storageManagerInputs: 'भंडारण विवरण',
      storageCropLabel: 'भंडारित करने के लिए फसल',
      storageHarvestedQtyLabel: 'काटी गई मात्रा (क्विंटल)',
      storageHarvestedQtyPlaceholder: 'जैसे, 500',
      storageTypeLabel: 'भंडारण का प्रकार',
      storageCapacityLabel: 'कुल क्षमता (क्विंटल)',
      storageCapacityPlaceholder: 'जैसे, 1000',
      storageSpoilageRateLabel: 'खराबी की दर (% प्रति सप्ताह)',
      storageUpdateButton: 'भंडारण विवरण सहेजें',
      storageDashboard: 'क्षमता डैशबोर्ड',
      storageRemainingCapacity: 'शेष क्षमता',
      storageSpoilageForecast: 'खराबी का पूर्वानुमान',
      storageWeek: 'सप्ताह',
      storageProjectedLoss: 'अनुमानित हानि',
      profitEngineTitle: 'उपज और लाभ इंजन',
      profitEngineSubtitle: 'अपनी लागत और अपेक्षित बाजार कीमतों के आधार पर अपने लाभ का अनुमान लगाएं।',
      profitEngineInputs: 'आपके अनुमान',
      profitEngineYieldLabel: 'अपेक्षित उपज (क्विంటల్/एकड़)',
      profitEngineYieldPlaceholder: 'जैसे, 25',
      profitEnginePriceLabel: 'अपेक्षित बाजार मूल्य (₹/क्विంటల్)',
      profitEnginePricePlaceholder: 'जैसे, 2000',
      profitEngineAnalysis: 'लाभ विश्लेषण',
      profitEngineTotalRevenue: 'अनुमानित राजस्व',
      profitEngineNetProfit: 'अनुमानित शुद्ध लाभ',
      profitEngineBreakEven: 'ब्रेक-ईवन उपज (क्विंटल/एकड़)',
      profitEngineChartTitle: 'लागत बनाम राजस्व',
      marketIntelTitle: 'बाजार और बिक्री खुफिया',
      marketIntelSubtitle: 'अधिकतम लाभ के लिए अपनी फसलें कब बेचें, इस पर एआई-संचालित सलाह प्राप्त करें।',
      marketIntelLocalPriceLabel: 'आपकी वर्तमान स्थानीय मंडी कीमत (₹/क्विంటల్)',
      marketIntelLocalPricePlaceholder: 'जैसे, 1950',
      marketIntelGetAnalysis: 'बिक्री सलाह प्राप्त करें',
      marketIntelAnalyzing: 'बाजार डेटा का विश्लेषण किया जा रहा है...',
      marketIntelError: 'बाजार विश्लेषण प्राप्त नहीं हो सका। कृपया पुनः प्रयास करें।',
      marketIntelAnalysisTitle: 'एआई बिक्री सिफारिश',
      marketIntelPriceTrend: 'हालिया मूल्य प्रवृत्ति',
      marketIntelSellVsStore: 'अभी बेचें बनाम स्टोर विश्लेषण',
      marketIntelDecision: 'निर्णय',
      marketIntelSellNow: 'अभी बेचें',
      marketIntelStoreFor: 'के लिए स्टोर करें',
      marketIntelWeeks: 'सप्ताह',
      marketIntelRecommendation: 'एआई सिफारिश',
      notebookTitle: 'फार्म नोटबुक',
      notebookSubtitle: 'इस मौसम के लिए अपने विचारों, निर्णयों और टिप्पणियों का रिकॉर्ड रखें।',
      notebookAddNotePlaceholder: 'एक नोट जोड़ने के लिए टाइप करें या माइक्रोफ़ोन पर क्लिक करें...',
      notebookAddNoteButton: 'नोट जोड़ें',
      notebookListening: 'सुन रहा है...',
      advisorTitle: 'एआई रणनीतिक सलाहकार',
      advisorSubtitle: 'आपके सबसे महत्वपूर्ण कृषि निर्णयों का मार्गदर्शन करने के लिए उन्नत एआई सिमुलेशन।',
      advisorRainFailureTitle: 'वर्षा विफलता निर्णय इंजन',
      advisorRainFailureDesc: 'एआई ने आपके खेत के सेटअप का विश्लेषण किया है और खराब वर्षा से जोखिम को कम करने के लिए निम्नलिखित रणनीतियाँ प्रदान करता है।',
      advisorCropSwitchTitle: 'फसल स्विच सिम्युलेटर',
      advisorCropSwitchDesc: 'एआई आपकी मिट्टी, मौसम और बाजार की स्थितियों के आधार पर इन वैकल्पिक फसलों का सुझाव देता है। वित्तीय प्रभाव का अनुकरण करने के लिए क्लिक करें।',
      advisorCurrentPlan: 'वर्तमान योजना',
      advisorSimulatedPlan: 'अनुरूपित योजना',
      advisorEstProfit: 'अनुमानित लाभ',
      advisorWaterReq: 'पानी की आवश्यकता',
      advisorRiskLevel: 'जोखिम स्तर',
      advisorSimulateBtn: 'अनुकरण करें',
      weatherTitle: 'मौसम हब',
      weatherSubtitle: "आपके खेत के लिए हाइपर-लोकल मौसम पूर्वानुमान और एआई-संचालित सलाह।",
      weatherCurrent: 'वर्तमान स्थितियाँ',
      weatherForecast: '7-दिन का पूर्वानुमान',
      weatherAdvisory: 'एआई मौसम सलाह',
      weatherFeelsLike: 'महसूस होता है',
      weatherHumidity: 'नमी',
      weatherWind: 'हवा',
      waterTitle: 'जल प्रबंधन',
      waterSubtitle: 'अपने सिंचाई कार्यक्रम को अनुकूलित करें और पानी के उपयोग को ट्रैक करें।',
      waterWeeklyUsage: 'अनुमानित साप्ताहिक उपयोग',
      waterNextIrrigation: 'अगली अनुशंसित सिंचाई',
      waterLogEvent: 'सिंचाई घटना लॉग करें',
      waterLogDate: 'तारीख',
      waterLogDuration: 'अवधि',
      waterLogDurationUnit: 'घंटे',
      waterLogButton: 'घटना लॉग करें',
      waterHistory: 'सिंचाई का इतिहास',
      waterAITip: 'एआई सिंचाई युक्ति',
      micPermissionDenied: "माइक्रोफ़ोन एक्सेस अस्वीकृत। वॉइस कमांड का उपयोग करने के लिए कृपया इसे अपनी ब्राउज़र सेटिंग्स में सक्षम करें।",
      gpsPermissionDenied: "स्थान एक्सेस अस्वीकृत। इस सुविधा का उपयोग करने के लिए कृपया इसे अपनी ब्राउज़र सेटिंग्स में सक्षम करें।",
      speakFarmSetupIntro: 'कृषि मित्र में आपका स्वागत है। सबसे पहले, शुरू करने के लिए अपनी कृषि प्रोफ़ाइल सेट करें।',
      speakFarmSetupLanguageIntro: 'कृषि मित्र में आपका स्वागत है। जारी रखने के लिए कृपया अपनी पसंदीदा भाषा चुनें या बोलें।',
      speakFarmSetupLocation: 'कृपया अपना स्थान दर्ज करें, जैसे कि आपका जिला और राज्य, या अपने जीपीएस का उपयोग करें।',
      speakFarmSetupLandSize: 'अब, मुझे एकड़ में अपने खेत का कुल आकार बताएं।',
      speakDashboardIntro: 'यह आपका कमांड सेंटर है। यह आपके द्वारा प्रदान किए गए डेटा के आधार पर आपके खेत का सारांश दिखाता है।',
      speakWeatherIntro: "यह वेदर हब है। यहां आपको अपने स्थान के लिए विस्तृत पूर्वानुमान और एआई सलाह मिलेगी।",
      speakWaterIntro: "यह जल प्रबंधन मॉड्यूल है। यहां अपने खेत के पानी के उपयोग को ट्रैक और अनुकूलित करें।",
      speakCostManagerIntro: 'इस मौसम के लिए अपनी सभी लागतों को दर्ज करने के लिए इस स्क्रीन का उपयोग करें। सटीक लाभ गणना के लिए यह महत्वपूर्ण है।',
      speakDiseaseScannerIntro: 'कृपया विश्लेषण के लिए प्रभावित फसल के पत्ते की एक स्पष्ट तस्वीर अपलोड करें।',
      speakStorageManagerIntro: 'अपनी इन्वेंट्री को प्रबंधित करने के लिए अपनी फसल और भंडारण विवरण दर्ज करें।',
      speakProfitEngineIntro: 'अपने संभावित लाभ की गणना के लिए अपनी अपेक्षित उपज और बाजार मूल्य दर्ज करें।',
      speakMarketIntelIntro: 'एआई-संचालित बिक्री अनुशंसा प्राप्त करने के लिए अपनी स्थानीय मंडी कीमत दर्ज करें।',
      speakNotebookIntro: 'यहां आप अपने खेत के बारे में नोट्स सहेज सकते हैं। अपनी आवाज से रिकॉर्ड करने के लिए माइक्रोफ़ोन पर क्लिक करें।',
      speakAdvisorIntro: 'यह रणनीतिक सलाहकार है। यह फसल बदलने और जोखिम प्रबंधन जैसे महत्वपूर्ण निर्णयों के लिए एआई-संचालित अंतर्दृष्टि प्रदान करता है।',
      speakAnalysisComplete: 'विश्लेषण पूरा हो गया है। यहाँ रिपोर्ट है।',
      speakSoilType: "अपने खेत की प्राथमिक मिट्टी का प्रकार चुनें।",
      speakCrops: "आप जो मुख्य फसलें लगा रहे हैं, उन्हें अल्पविराम से अलग करके दर्ज करें।",
      speakSeason: "वर्तमान कृषि मौसम चुनें।",
      speakWaterSource: "सिंचाई के लिए अपने मुख्य जल स्रोत का चयन करें।",
      speakIrrigation: "सिंचाई की अपनी प्राथमिक विधि चुनें।",
      speakMachinery: "आपके पास उपलब्ध मुख्य मशीनरी, जैसे ट्रैक्टर या हार्वेस्टर, को सूचीबद्ध करें।",
      speakCompleteSetupBtn: "अपनी कृषि प्रोफ़ाइल सेट करना समाप्त करने के लिए यहां क्लिक करें।",
      speakSeedsQty: "आपने जो बीज खरीदे हैं, उनकी कुल मात्रा किलोग्राम में दर्ज करें।",
      speakSeedsCost: "सभी बीजों की कुल लागत दर्ज करें।",
      speakFertilizerType: "उर्वरक का नाम दर्ज करें, जैसे यूरिया या डीएपी।",
      speakFertilizerQty: "इस उर्वरक की मात्रा किलोग्राम में दर्ज करें।",
      speakFertilizerCost: "इस उर्वरक की कुल लागत दर्ज करें।",
      speakAddFertilizerBtn: "सूची में एक और उर्वरक जोड़ने के लिए क्लिक करें।",
      speakPesticideType: "कीटनाशक या कवकनाशी का नाम दर्ज करें।",
      speakPesticideQty: "इस कीटनाशक की मात्रा लीटर या किलोग्राम में दर्ज करें।",
      speakPesticideCost: "इस कीटनाशक की कुल लागत दर्ज करें।",
      speakAddPesticideBtn: "सूची में एक और कीटनाशक जोड़ने के लिए क्लिक करें।",
      speakLaborDays: "काम पर रखे गए मजदूरों के कुल दिनों की संख्या दर्ज करें।",
      speakLaborWages: "सभी मजदूरों को मजदूरी में भुगतान की गई कुल राशि दर्ज करें।",
      speakMachineryHours: "ट्रैक्टर जैसी मशीनरी का उपयोग किए गए कुल घंटे दर्ज करें।",
      speakMachineryFuel: "सभी मशीनरी के लिए ईंधन की कुल लागत दर्ज करें।",
      speakElectricityCost: "इस मौसम के लिए अपना कुल बिजली बिल दर्ज करें।",
      speakIrrigationCost: "सिंचाई या पानी के लिए कोई अतिरिक्त लागत दर्ज करें।",
      speakTransportCost: "अपने माल के परिवहन की कुल लागत दर्ज करें।",
      speakStorageCost: "अपनी फसल के भंडारण की कुल लागत दर्ज करें।",
      speakUpdateCostsBtn: "अपने सभी खर्चों को बचाने और गणनाओं को अपडेट करने के लिए यहां क्लिक करें।",
      speakUploadArea: "अपने डिवाइस से प्रभावित फसल के पत्ते की एक तस्वीर का चयन करने के लिए यहां क्लिक करें।",
      speakAnalyzeCropBtn: "एक तस्वीर का चयन करने के बाद, एआई विश्लेषण शुरू करने के लिए यहां क्लिक करें।",
      speakStorageCrop: "वह फसल चुनें जिसे आपने काटा है और संग्रहीत कर रहे हैं।",
      speakHarvestedQty: "आपने जो कुल मात्रा काटी है, उसे क्विंटल में दर्ज करें।",
      speakStorageType: "उस सुविधा का प्रकार चुनें जहाँ आप अपनी फसल संग्रहीत कर रहे हैं।",
      speakStorageCapacity: "आपके पास जो कुल भंडारण क्षमता है, उसे क्विंटल में दर्ज करें।",
      speakSpoilageRate: "प्रत्येक सप्ताह खराब हो सकने वाली फसल का अनुमानित प्रतिशत दर्ज करें।",
      speakUpdateStorageBtn: "अपनी भंडारण जानकारी को बचाने के लिए क्लिक करें।",
      speakProfitYield: "प्रत्येक एकड़ से आपको जो उपज मिलने की उम्मीद है, उसे क्विंटल में दर्ज करें।",
      speakProfitPrice: "अपनी फसल के प्रत्येक क्विंटल के लिए आपको जो बाजार मूल्य मिलने की उम्मीद है, उसे दर्ज करें।",
      speakMarketPrice: "अपने निकटतम स्थानीय बाजार या मंडी में वर्तमान बिक्री मूल्य दर्ज करें।",
      speakGetMarketAdviceBtn: "अभी बेचने या अपनी फसल को संग्रहीत करने के बारे में एआई-संचालित सलाह प्राप्त करने के लिए यहां क्लिक करें।",
      speakNotebookText: "आप अपने नोट्स यहाँ टाइप कर सकते हैं।",
      speakNotebookMicBtn: "अपनी आवाज से एक नोट रिकॉर्ड करना शुरू करने या रोकने के लिए इस बटन पर क्लिक करें।",
      speakNotebookAddBtn: "इस नोट को अपनी नोटबुक में सहेजने के लिए क्लिक करें।",
    },
  },
  ur: {
    ui: {
      appName: 'کرشی مترا',
      submit: 'جمع کرائیں',
      next: 'اگلا',
      back: 'پیچھے',
      save: 'اخراجات محفوظ کریں',
      confirm: 'تصدیق کریں اور ختم کریں',
      navDashboard: 'کمانڈ سینٹر',
      navWeatherHub: 'موسم کا مرکز',
      navWaterManage: 'پانی کا انتظام',
      navCostManager: 'لاگت کا مینیجر',
      navDiseaseScanner: 'بیماری کا اسکینر',
      navStorageManager: 'اسٹوریج مینیجر',
      navProfitEngine: 'منافع کا انجن',
      navMarketIntel: 'مارکیٹ انٹیل',
      navNotebook: 'نوٹ بک',
      navStrategicAdvisor: 'اسٹریٹجک مشیر',
      headerStatus: 'حیثیت',
      headerStatusText: 'فعال',
      farmSetupTitle: 'کرشی مترا میں خوش آمدید',
      farmSetupSubtitle: 'آئیے آپ کے فارم پروفائل کو درست، AI سے چلنے والی सलाह کے لیے ترتیب دیں۔',
      farmSetupLanguageSelectPrompt: 'براہ کرم اپنی زبان منتخب کریں یا بولیں',
      farmSetupStep1: 'مقام',
      farmSetupStep2: 'فارم کی بنیادی باتیں',
      farmSetupStep3: 'بنیادی ڈھانچہ',
      farmSetupStep4: 'تصدیق',
      farmSetupLocationTitle: 'آپ کا فارم کہاں واقع ہے؟',
      farmSetupLocationDesc: 'درست مقام موسم اور مارکیٹ کا درست ڈیٹا فراہم کرنے میں مدد کرتا ہے۔',
      farmSetupLocationLabel: 'آپ کا مقام (ضلع، ریاست)',
      farmSetupLocationPlaceholder: 'مثال کے طور پر، گنٹور، آندھرا پردیش',
      farmSetupUseGPS: 'میرا مقام استعمال کریں',
      farmSetupGeocoding: 'مقام حاصل کیا جا رہا ہے...',
      farmSetupBasicsTitle: 'ہمیں اپنے فارم کے بارے میں بتائیں۔',
      farmSetupBasicsDesc: 'یہ بنیادی معلومات فصل اور لاگت کے تجزیے کے لیے اہم ہے۔',
      farmSetupLandSizeLabel: 'کل زمین کا سائز (ایکڑ میں)',
      farmSetupSoilTypeLabel: 'بنیادی مٹی کی قسم',
      farmSetupCropsLabel: 'لگائی گئی اہم فصلیں (کوما سے الگ)',
      farmSetupCropsPlaceholder: 'مثال کے طور پر، چاول، کپاس',
      farmSetupInfraTitle: 'آپ کے فارم کا بنیادی ڈھانچہ کیا ہے؟',
      farmSetupInfraDesc: 'آپ کے وسائل کے بارے میں تفصیلات آپریشنل مشورے پیدا کرنے میں مدد کرتی ہیں۔',
      farmSetupSeasonLabel: 'موجودہ موسم',
      farmSetupWaterSourceLabel: 'پانی کا بنیادی ذریعہ',
      farmSetupIrrigationLabel: 'آبپاشی کا طریقہ',
      farmSetupMachineryLabel: 'دستیاب مشینری (کوما سے الگ)',
      farmSetupMachineryPlaceholder: 'مثال کے طور پر، ٹریکٹر، سپرےر',
      farmSetupConfirmTitle: 'اپنے فارم کی تفصیلات کی تصدیق کریں',
      farmSetupConfirmDesc: 'سیٹ اپ مکمل کرنے سے پہلے براہ کرم تمام معلومات کا جائزہ لیں۔',
      farmSetupConfirmLabelLocation: 'مقام',
      farmSetupConfirmLabelLand: 'زمین کا سائز',
      farmSetupConfirmLabelSoil: 'مٹی کی قسم',
      farmSetupConfirmLabelCrops: 'فصلیں',
      farmSetupConfirmLabelSeason: 'موسم',
      farmSetupConfirmLabelWater: 'پانی کا ذریعہ',
      farmSetupConfirmLabelIrrigation: 'آبپاشی',
      farmSetupConfirmLabelMachinery: 'مشینری',
      farmSetupCompleteButton: 'فارم سیٹ اپ مکمل کریں',
      dashboardTitle: 'کمانڈ سینٹر',
      dashboardSubtitle: 'آپ کے ان پٹ کی بنیاد پر آپ کے فارم آپریشنز کا ایک مکمل جائزہ۔',
      kpiTotalInvestment: 'کل سرمایہ کاری',
      kpiCostPerAcre: 'لاگت / ایکڑ',
      kpiCropCount: 'لگائی گئی فصلیں',
      kpiLandSize: 'کل زمین',
      quickAccess: 'فوری رسائی',
      aiInsightsTitle: 'AI اسٹریٹجک بصیرت',
      debtPressureTitle: 'قرض کا دباؤ',
      debtPressureLow: 'کم',
      debtPressureModerate: 'اعتدال پسند',
      debtPressureHigh: 'زیادہ',
      rainFailureTitle: 'بارش کی ناکامی کا خطرہ',
      cropSwitchTitle: 'فصل کی تبدیلی کا موقع',
      viewStrategies: 'حکمت عملی دیکھیں',
      weatherWidgetTitle: 'موسم کا مرکز',
      waterWidgetTitle: 'پانی کا انتظام',
      viewDetails: 'تفصیلات دیکھیں',
      costManagerTitle: 'اسمارٹ ان پٹ اور لاگت کا مینیجر',
      costManagerSubtitle: 'اپنی کل سرمایہ کاری کو ٹریک کرنے کے لیے اپنے تمام موسمی اخراجات یہاں لاگ کریں۔',
      costCategorySeeds: 'بیج',
      costCategoryFertilizers: 'کھادیں',
      costCategoryPesticides: 'کیڑے مار ادویات',
      costCategoryLabor: 'مزدوری',
      costCategoryMachinery: 'مشینری',
      costCategoryUtilities: 'یوٹیلٹیز',
      costLabelQuantity: 'مقدار (کلوگرام)',
      costLabelCost: 'کل لاگت (₹)',
      costLabelType: 'کھاد/کیڑے مار دوا کا نام',
      costLabelDays: 'کل دن',
      costLabelWages: 'کل اجرت (₹)',
      costLabelUsageHours: 'استعمال (گھنٹے)',
      costLabelFuelCost: 'ایندھن کی لاگت (₹)',
      costLabelElectricity: 'بجلی کی لاگت (₹)',
      costLabelIrrigation: 'آبپاشی کی لاگت (₹)',
      costLabelTransport: 'نقل و حمل کی لاگت (₹)',
      costLabelStorage: 'اسٹوریج کی لاگت (₹)',
      costAddFertilizer: 'کھاد شامل کریں',
      costAddPesticide: 'کیڑے مار دوا شامل کریں',
      costTotalInvestment: 'کل سرمایہ کاری',
      costPerAcre: 'لاگت فی ایکڑ',
      costUpdateButton: 'اخراجات محفوظ اور اپ ڈیٹ کریں',
      diseaseScannerTitle: 'AI بیماری اور فصل کی صحت',
      diseaseScannerSubtitle: 'فوری تشخیص اور علاج کے مشورے کے لیے فصل کے پتے کی تصویر اپ لوڈ کریں۔',
      diseaseScannerUploadLabel: 'اپ لوڈ کرنے کے لیے کلک کریں یا تصویر کو گھسیٹ کر چھوڑ دیں',
      diseaseScannerUploadButton: 'تصویر منتخب کریں',
      diseaseScannerAnalyzing: 'AI آپ کی فصل کا تجزیہ کر رہا ہے... براہ کرم انتظار کریں۔',
      diseaseScannerError: 'معذرت، AI تصویر کا تجزیہ نہیں کر سکا۔ براہ کرم دوسری تصویر آزمائیں۔',
      diseaseScannerResultTitle: 'AI تشخیصی رپورٹ',
      diseaseScannerResultConfidence: 'اعتماد',
      diseaseScannerResultSeverity: 'شدت',
      diseaseScannerResultExplanation: 'سادہ وضاحت',
      diseaseScannerResultTreatment: 'علاج کے اقدامات',
      diseaseScannerResultCost: 'تخمینی لاگت (₹)',
      diseaseScannerResultPrevention: 'احتیاطی تدابیر',
      storageManagerTitle: 'اسٹوریج اور صلاحیت کا مینیجر',
      storageManagerSubtitle: 'اپنی کٹائی ہوئی فصلوں، اسٹوریج کی صلاحیت، اور ممکنہ خرابی کو ٹریک کریں۔',
      storageManagerInputs: 'اسٹوریج کی تفصیلات',
      storageCropLabel: 'ذخیرہ کرنے کے لیے فصل',
      storageHarvestedQtyLabel: 'کٹائی کی مقدار (کوئنٹل)',
      storageHarvestedQtyPlaceholder: 'مثال کے طور پر، 500',
      storageTypeLabel: 'اسٹوریج کی قسم',
      storageCapacityLabel: 'کل صلاحیت (کوئنٹل)',
      storageCapacityPlaceholder: 'مثال کے طور پر، 1000',
      storageSpoilageRateLabel: 'خرابی کی شرح (فی ہفتہ %)',
      storageUpdateButton: 'اسٹوریج کی تفصیلات محفوظ کریں',
      storageDashboard: 'صلاحیت کا ڈیش بورڈ',
      storageRemainingCapacity: 'باقی صلاحیت',
      storageSpoilageForecast: 'خرابی کی پیشن گوئی',
      storageWeek: 'ہفتہ',
      storageProjectedLoss: 'متوقع نقصان',
      profitEngineTitle: 'پیداوار اور منافع کا انجن',
      profitEngineSubtitle: 'اپنی لاگت اور متوقع مارکیٹ قیمتوں کی بنیاد پر اپنے منافع کا تخمینہ لگائیں۔',
      profitEngineInputs: 'آپ کے تخمینے',
      profitEngineYieldLabel: 'متوقع پیداوار (کوئنٹل فی ایکڑ)',
      profitEngineYieldPlaceholder: 'مثال کے طور پر، 25',
      profitEnginePriceLabel: 'متوقع مارکیٹ قیمت (₹ فی کوئنٹل)',
      profitEnginePricePlaceholder: 'مثال کے طور پر، 2000',
      profitEngineAnalysis: 'منافع کا تجزیہ',
      profitEngineTotalRevenue: 'تخمینی آمدنی',
      profitEngineNetProfit: 'تخمینی خالص منافع',
      profitEngineBreakEven: 'بریک ایون پیداوار (کوئنٹل/ایکڑ)',
      profitEngineChartTitle: 'لاگت بمقابلہ آمدنی',
      marketIntelTitle: 'مارکیٹ اور فروخت کی ذہانت',
      marketIntelSubtitle: 'زیادہ سے زیادہ منافع کے لیے اپنی فصلیں کب بیچیں اس پر AI سے چلنے والی सलाह حاصل کریں۔',
      marketIntelLocalPriceLabel: 'آپ کی موجودہ مقامی منڈی کی قیمت (₹ فی کوئنٹل)',
      marketIntelLocalPricePlaceholder: 'مثال کے طور پر، 1950',
      marketIntelGetAnalysis: 'فروخت کا مشورہ حاصل کریں',
      marketIntelAnalyzing: 'مارکیٹ کے ڈیٹا کا تجزیہ کیا جا رہا ہے...',
      marketIntelError: 'مارکیٹ کا تجزیہ حاصل نہیں ہو سکا۔ براہ کرم دوبارہ کوشش کریں۔',
      marketIntelAnalysisTitle: 'AI فروخت کی سفارش',
      marketIntelPriceTrend: 'حالیہ قیمت کا رجحان',
      marketIntelSellVsStore: 'ابھی بیچیں بمقابلہ اسٹور تجزیہ',
      marketIntelDecision: 'فیصلہ',
      marketIntelSellNow: 'ابھی بیچیں',
      marketIntelStoreFor: 'کے لیے ذخیرہ کریں',
      marketIntelWeeks: 'ہفتے',
      marketIntelRecommendation: 'AI کی سفارش',
      notebookTitle: 'فارم نوٹ بک',
      notebookSubtitle: 'اس موسم کے لیے اپنے خیالات، فیصلوں اور مشاہدات کا ریکارڈ رکھیں۔',
      notebookAddNotePlaceholder: 'نوٹ شامل کرنے کے لیے ٹائپ کریں یا مائیکروفون پر کلک کریں...',
      notebookAddNoteButton: 'نوٹ شامل کریں',
      notebookListening: 'سن رہا ہے...',
      advisorTitle: 'AI اسٹریٹجک مشیر',
      advisorSubtitle: 'آپ کے سب سے اہم کاشتکاری کے فیصلوں کی رہنمائی کے لیے جدید AI सिमुलेशन۔',
      advisorRainFailureTitle: 'بارش کی ناکامی کا فیصلہ انجن',
      advisorRainFailureDesc: 'AI نے آپ کے فارم کے سیٹ اپ کا تجزیہ کیا ہے اور کم بارش سے خطرے کو کم کرنے کے لیے درج ذیل حکمت عملی فراہم کرتا ہے۔',
      advisorCropSwitchTitle: 'فصل سوئچ سمیلیٹر',
      advisorCropSwitchDesc: 'AI آپ کی مٹی، موسم، اور مارکیٹ کے حالات کی بنیاد پر ان متبادل فصلوں کا مشورہ دیتا ہے۔ مالیاتی اثرات کی تقلید کے لیے کلک کریں۔',
      advisorCurrentPlan: 'موجودہ منصوبہ',
      advisorSimulatedPlan: 'نقلی منصوبہ',
      advisorEstProfit: 'تخمینی منافع',
      advisorWaterReq: 'پانی کی ضرورت',
      advisorRiskLevel: 'خطرے کی سطح',
      advisorSimulateBtn: 'تقلید کریں',
      weatherTitle: 'موسم کا مرکز',
      weatherSubtitle: "آپ کے فارم کے لیے ہائپر لوکل موسم کی پیشن گوئیاں اور AI سے چلنے والی सलाह۔",
      weatherCurrent: 'موجودہ حالات',
      weatherForecast: '7 دن کی پیشن گوئی',
      weatherAdvisory: 'AI موسم کی सलाह',
      weatherFeelsLike: 'محسوس ہوتا ہے',
      weatherHumidity: 'نمی',
      weatherWind: 'ہوا',
      waterTitle: 'پانی کا انتظام',
      waterSubtitle: 'اپنے آبپاشی کے شیڈول کو بہتر بنائیں اور پانی کے استعمال کو ٹریک کریں۔',
      waterWeeklyUsage: 'تخمینی ہفتہ وار استعمال',
      waterNextIrrigation: 'اگلی تجویز کردہ آبپاشی',
      waterLogEvent: 'آبپاشی کا واقعہ لاگ کریں',
      waterLogDate: 'تاریخ',
      waterLogDuration: 'دورانیہ',
      waterLogDurationUnit: 'گھنٹے',
      waterLogButton: 'واقعہ لاگ کریں',
      waterHistory: 'آبپاشی کی تاریخ',
      waterAITip: 'AI آبپاشی کا مشورہ',
      micPermissionDenied: "مائیکروفون تک رسائی مسترد کر دی گئی۔ وائس کمانڈز استعمال کرنے کے لیے براہ کرم اسے اپنے براؤزر کی سیٹنگز میں فعال کریں۔",
      gpsPermissionDenied: "مقام تک رسائی مسترد کر دی گئی۔ اس خصوصیت کو استعمال کرنے کے لیے براہ کرم اسے اپنے براؤزر کی ترتیبات میں فعال کریں۔",
      speakFarmSetupIntro: 'کرشی مترا میں خوش آمدید۔ سب سے پہلے، آئیے شروع کرنے کے لیے آپ کا فارم پروفائل ترتیب دیں۔',
      speakFarmSetupLanguageIntro: 'کرشی مترا میں خوش آمدید۔ جاری رکھنے کے لیے براہ کرم اپنی پسندیدہ زبان منتخب کریں یا بولیں۔',
      speakFarmSetupLocation: 'براہ کرم اپنا مقام درج کریں، جیسے آپ کا ضلع اور ریاست، یا اپنا GPS استعمال کریں۔',
      speakFarmSetupLandSize: 'اب، مجھے ایکڑ میں اپنے فارم کا کل سائز بتائیں۔',
      speakDashboardIntro: 'یہ آپ کا کمانڈ سینٹر ہے۔ یہ آپ کے فراہم کردہ ڈیٹا کی بنیاد پر آپ کے فارم کا خلاصہ دکھاتا ہے۔',
      speakWeatherIntro: "یہ ویدر ہب ہے۔ یہاں آپ کو اپنے مقام کے لیے تفصیلی پیشن گوئیاں اور AI مشورے ملیں گے۔",
      speakWaterIntro: "یہ واٹر مینجمنٹ ماڈیول ہے۔ یہاں اپنے فارم کے پانی کے استعمال کو ٹریک اور بہتر بنائیں۔",
      speakCostManagerIntro: 'اس سیزن کے لیے اپنی تمام لاگتیں درج کرنے کے لیے اس اسکرین کا استعمال کریں۔ درست منافع کے حساب کے لیے یہ اہم ہے۔',
      speakDiseaseScannerIntro: 'براہ کرم تجزیہ کے لیے متاثرہ فصل کے پتے کی ایک واضح تصویر اپ لوڈ کریں۔',
      speakStorageManagerIntro: 'اپنی انوینٹری کا انتظام کرنے کے لیے اپنی فصل اور اسٹوریج کی تفصیلات درج کریں۔',
      speakProfitEngineIntro: 'اپنے ممکنہ منافع کا حساب لگانے کے لیے اپنی متوقع پیداوار اور مارکیٹ کی قیمت درج کریں۔',
      speakMarketIntelIntro: 'AI سے چلنے والی فروخت کی سفارش حاصل کرنے کے لیے اپنی مقامی منڈی کی قیمت درج کریں۔',
      speakNotebookIntro: 'یہاں آپ اپنے فارم کے بارے میں نوٹ محفوظ کر سکتے ہیں۔ اپنی آواز سے ریکارڈ کرنے کے لیے مائیکروفون پر کلک کریں۔',
      speakAdvisorIntro: 'یہ اسٹریٹجک ایڈوائزر ہے۔ یہ فصل کی تبدیلی اور رسک مینجمنٹ جیسے اہم فیصلوں کے لیے AI سے چلنے والی بصیرت فراہم کرتا ہے۔',
      speakAnalysisComplete: 'تجزیہ مکمل ہو گیا ہے۔ یہ رہی رپورٹ۔',
      speakSoilType: "اپنے فارم کی بنیادی مٹی کی قسم منتخب کریں۔",
      speakCrops: "جو اہم فصلیں آپ لگا رہے ہیں، انہیں کوما سے الگ کرکے درج کریں۔",
      speakSeason: "موجودہ زرعی موسم کا انتخاب کریں۔",
      speakWaterSource: "آبپاشی کے لیے اپنے پانی کا بنیادی ذریعہ منتخب کریں۔",
      speakIrrigation: "آبپاشی کا اپنا بنیادی طریقہ منتخب کریں۔",
      speakMachinery: "آپ کے پاس دستیاب اہم مشینری، جیسے ٹریکٹر یا ہارویسٹر، کی فہرست بنائیں۔",
      speakCompleteSetupBtn: "اپنا فارم پروفائل سیٹ اپ مکمل کرنے کے لیے یہاں کلک کریں۔",
      speakSeedsQty: "خریدے گئے بیجوں کی کل مقدار کلوگرام میں درج کریں۔",
      speakSeedsCost: "تمام بیجوں کی کل لاگت درج کریں۔",
      speakFertilizerType: "کھاد کا نام درج کریں، جیسے یوریا یا ڈی اے پی۔",
      speakFertilizerQty: "اس کھاد کی مقدار کلوگرام میں درج کریں۔",
      speakFertilizerCost: "اس کھاد کی کل لاگت درج کریں۔",
      speakAddFertilizerBtn: "فہرست میں ایک اور کھاد شامل کرنے کے لیے کلک کریں۔",
      speakPesticideType: "کیڑے مار دوا یا فنگسائڈ کا نام درج کریں۔",
      speakPesticideQty: "اس کیڑے مار دوا کی مقدار لیٹر یا کلوگرام میں درج کریں۔",
      speakPesticideCost: "اس کیڑے مار دوا کی کل لاگت درج کریں۔",
      speakAddPesticideBtn: "فہرست میں ایک اور کیڑے مار دوا شامل کرنے کے لیے کلک کریں۔",
      speakLaborDays: "مزدوروں کو کام پر رکھنے کے کل دنوں کی تعداد درج کریں۔",
      speakLaborWages: "تمام مزدوروں کو اجرت میں ادا کی گئی کل رقم درج کریں۔",
      speakMachineryHours: "ٹریکٹر جیسی مشینری کے استعمال کے کل گھنٹے درج کریں۔",
      speakMachineryFuel: "تمام مشینری کے لیے ایندھن کی کل لاگت درج کریں۔",
      speakElectricityCost: "اس سیزن کے لیے اپنا کل بجلی کا بل درج کریں۔",
      speakIrrigationCost: "آبپاشی یا پانی کے لیے کوئی اضافی لاگت درج کریں۔",
      speakTransportCost: "اپنے سامان کی نقل و حمل کی کل لاگت درج کریں۔",
      speakStorageCost: "اپنی فصل کو ذخیرہ کرنے کی کل لاگت درج کریں۔",
      speakUpdateCostsBtn: "اپنے تمام اخراجات کو محفوظ کرنے اور حسابات کو اپ ڈیٹ کرنے کے لیے یہاں کلک کریں۔",
      speakUploadArea: "اپنے آلے سے متاثرہ فصل کے پتے کی تصویر منتخب کرنے کے لیے یہاں کلک کریں۔",
      speakAnalyzeCropBtn: "تصویر منتخب करने के बाद، AI تجزیہ شروع करने के लिए यहां کلک کریں۔",
      speakStorageCrop: "وہ فصل منتخب کریں جسے آپ نے کاٹا ہے اور ذخیرہ کر رہے ہیں۔",
      speakHarvestedQty: "کٹائی کی کل مقدار کوئنٹل میں درج کریں۔",
      speakStorageType: "اس سہولت کی قسم منتخب کریں جہاں آپ اپنی فصل ذخیرہ کر رہے ہیں۔",
      speakStorageCapacity: "آپ کے پاس موجود کل ذخیرہ کرنے کی صلاحیت کوئنٹل میں درج کریں۔",
      speakSpoilageRate: "ہر ہفتے خراب ہو سکنے والی فصل کا تخمینی فیصد درج کریں۔",
      speakUpdateStorageBtn: "اپنی ذخیرہ کرنے کی معلومات کو محفوظ کرنے کے لیے کلک کریں۔",
      speakProfitYield: "ہر ایکڑ سے متوقع پیداوار کوئنٹل میں درج کریں۔",
      speakProfitPrice: "اپنی فصل کے ہر کوئنٹل کے لیے متوقع مارکیٹ قیمت درج کریں۔",
      speakMarketPrice: "اپنے قریبی مقامی مارکیٹ یا منڈی میں موجودہ فروخت کی قیمت درج کریں۔",
      speakGetMarketAdviceBtn: "ابھی بیچنے یا اپنی فصل کو ذخیرہ کرنے کے بارے میں AI سے چلنے والی सलाह حاصل کرنے کے لیے یہاں کلک کریں۔",
      speakNotebookText: "آپ اپنے نوٹ یہاں ٹائپ کر سکتے ہیں۔",
      speakNotebookMicBtn: "اپنی آواز سے نوٹ ریکارڈ کرنا شروع کرنے یا روکنے کے لیے इस बटन पर क्लिक करें।",
      speakNotebookAddBtn: "اس نوٹ کو اپنی نوٹ بک میں محفوظ کرنے کے لیے کلک کریں۔",
    }
  },
};
