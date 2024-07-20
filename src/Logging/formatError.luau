--!strict
--!nolint LocalUnused
--!nolint LocalShadow
local task = nil -- Disable usage of Roblox's task scheduler

--[[
	Formats a Fusion-specific error message.
	TEAM FIREWORKS DEVIATION: add seperation for hotfusion errors
]]

local Package = script.Parent.Parent
local Types = require(Package.Types)
local messages = require(Package.Logging.messages)

local ERROR_INFO_URL = "https://elttob.uk/Fusion/0.3/api-reference/general/errors/#"

local function formatError(
	externalProvider: Types.ExternalProvider?,
	messageID: string,
	errorOrTrace: Types.Error | string | nil,
	...: unknown
): string
	local originalMessageID = messageID
	local error: Types.Error? = if typeof(errorOrTrace) == "table" then errorOrTrace else nil
	local trace: string? = if typeof(errorOrTrace) == "table" then errorOrTrace.trace else errorOrTrace
	local fusionMessage, hotfusionMessage = messages.Fusion[messageID], messages.Fusion[messageID]
	local messageText = fusionMessage or hotfusionMessage
	if not fusionMessage or not hotfusionMessage then
		messageID = "unknownMessage"
		messageText = messages.Fusion[messageID]
	end
	messageText = messageText:format(...)
	if error ~= nil then
		messageText = messageText:gsub("ERROR_MESSAGE", error.message)
		if error.context ~= nil then
			messageText ..= ` ({error.context})`
		end
	else
		messageText = messageText:gsub("ERROR_MESSAGE", originalMessageID)
	end
	messageText = `[{fusionMessage and "Fusion" or "Hotfusion"}] {messageText} \nID: {messageID}`
	if externalProvider ~= nil and externalProvider.policies.allowWebLinks then
		messageText ..= fusionMessage
			and `\nLearn more: {ERROR_INFO_URL}{messageID:lower()}`
			or "Note that Hotfusion is a fork of Fusion, thus errors thrown are not documented with Fusion."
	end
	if trace ~= nil then
		messageText ..= ` \n---- Stack trace ----\n{trace}`
	end
	return messageText:gsub("\n", "\n    ")
end

return formatError